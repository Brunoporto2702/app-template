import { INestApplication } from '@nestjs/common';
import { AuthController } from 'src/utility-modules/auth/interactors/http/auth.controller';
import { SqlUserRepository } from 'src/utility-modules/auth/infra/data/repositories/sql-user-repository';
import { AuthService } from 'src/utility-modules/auth/domain/services/auth.service';
import { UserMapper } from 'src/utility-modules/auth/mappers/user.mapper';
import CreateUserCommand from 'src/utility-modules/auth/domain/commands/create-user.command';
import InvalidInputException from 'src/common/core/exceptions/invalid-input.exception';
import * as request from 'supertest';
import { UpdateUser } from 'src/utility-modules/auth/dtos/IN/update.interface';
import initializeTestApp from 'test/utility-modules/authentication/helpers/fixtures/app-initializer';

describe('AuthController', () => {
  let userRepository: SqlUserRepository;
  let authController: AuthController;
  let authService: AuthService;
  let app: INestApplication;

  beforeEach(async () => {
    const initializeResult = await initializeTestApp();
    app = initializeResult.app;
    const module = initializeResult.module;

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<SqlUserRepository>(SqlUserRepository);
    authController = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    await app.close();
  }, 3000);

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('creates a new user', async () => {
    const user = {
      email: 'some.test@email.com',
      roles: ['user'],
    };

    const createdUser = await authService.createUser(user as CreateUserCommand);

    expect(UserMapper.modelToUserOut(createdUser)).toMatchObject(user);

    const userExists = await userRepository.findByEmail(user.email);

    expect(userExists).toMatchObject(createdUser);
  });

  it('throws an error when trying to create a new user with an invalid role', async () => {
    const user = {
      email: 'some.test@email.com',
      roles: ['qualquer coisa'],
    };

    const callCreateUser = async () =>
      await authService.createUser(user as CreateUserCommand);

    await expect(callCreateUser).rejects.toThrowError(InvalidInputException);
  });

  it('updates the password of a user whose password has never been updated before', async () => {
    // arrange

    const user = {
      email: 'some.test@email.com',
      roles: ['user'],
    };
    // create user
    await authService.createUser(user as CreateUserCommand);

    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    // // act
    const userWithNewPassword = await authController.signUp(userCredentials);
    expect(userWithNewPassword).toMatchObject({
      email: user.email,
      id: userWithNewPassword.id,
      cellPhone: null,
      name: null,
      confirmed: true,
      roles: user.roles,
      taxId: 'undefined',
    });
  });

  it('logins (/auth/login) a user whose password has already been updated ', async () => {
    // arrange

    const user = {
      email: 'some.test@email.com',
      roles: ['user'],
    };
    // create user and update its password
    await authService.createUser(user as CreateUserCommand);
    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    const userWithNewPassword = await authController.signUp(userCredentials);

    // act
    const userLoggedResponse = await authService.signIn(userCredentials);

    expect(userLoggedResponse).toMatchObject({
      access_token: userLoggedResponse.access_token,
      userId: userWithNewPassword.id,
      userEmail: userWithNewPassword.email,
    });
  });

  it('accesses the user data through a protected route (/auth/user) by providing a valid access token', async () => {
    // arrange
    const user = {
      email: 'some.test@email.com',
      roles: ['user'],
    };
    // create user and update its password
    await authService.createUser(user as CreateUserCommand);
    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    await authController.signUp(userCredentials);
    const userLoggedResponse = await authService.signIn(userCredentials);

    // act
    request(app.getHttpServer())
      .get('/auth/user')
      .auth(userLoggedResponse.access_token, { type: 'bearer' })
      .expect(200)
      .expect(function (res) {
        return res.body;
      })
      .end((err) => {
        if (err) return err;
      });
  });

  it('accesses a route protected by a RolesGuard and an AuthGuard by providing a valid access token and a user as a role', async () => {
    // arrange

    const user = {
      email: 'some.test@email.com',
      roles: ['user'],
    };
    // create user and update its password
    await authService.createUser(user as CreateUserCommand);
    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    const userWithNewPassword = await authController.signUp(userCredentials);
    const userLoggedResponse = await authService.signIn(userCredentials);

    // act
    const updateUser: UpdateUser = {
      email: userWithNewPassword.email,
      name: userWithNewPassword.name,
      cellPhone: userWithNewPassword.cellPhone,
      confirmed: userWithNewPassword.confirmed,
      taxId: userWithNewPassword.taxId,
    };

    return request(app.getHttpServer())
      .patch('/auth/update')
      .auth(userLoggedResponse.access_token, { type: 'bearer' })
      .send(updateUser)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(updateUser);
      });
  });

  it('should throw an error 403 forbidden if the user doesnt have user as a role ', async () => {
    // arrange

    const user = {
      email: 'some.test@email.com',
      roles: ['admin'],
    };
    // create user and update its password
    await authService.createUser(user as CreateUserCommand);
    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    await authController.signUp(userCredentials);
    const userLoggedResponse = await authService.signIn(userCredentials);

    // act

    await request(app.getHttpServer())
      .patch('/auth/update')
      .auth(userLoggedResponse.access_token, { type: 'bearer' })
      .expect(403);
  });

  it('should throw an error 401 Unauthorized if the user wants to login without a valid jwt token ', async () => {
    // arrange

    const user = {
      email: 'some.test@email.com',
      roles: ['admin'],
    };
    // create user and update its password
    await authService.createUser(user as CreateUserCommand);
    const userCredentials = {
      email: 'some.test@email.com',
      password: '123',
    };
    await authController.signUp(userCredentials);
    const userLoggedResponse = await authService.signIn(userCredentials);

    // act
    userLoggedResponse.access_token = '43948394893'; //invalid token
    await request(app.getHttpServer())
      .patch('/auth/update')
      .auth(userLoggedResponse.access_token, { type: 'bearer' })
      .expect(401);
  });
});
