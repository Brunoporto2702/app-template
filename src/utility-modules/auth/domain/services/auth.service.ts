import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SqlUserRepository } from '../../infra/data/repositories/sql-user-repository';
import SignInUserCommand from '../commands/sign-in-user.command';
import { JwtService } from '@nestjs/jwt';
import UpdateUserCommand from '../commands/update-user.command';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import Cpf from 'src/common/core/types/cpf';
import Cnpj from 'src/common/core/types/cnpj';
import CreateUserCommand from '../commands/create-user.command';
import { User } from '../models/user';

interface AuthResponse {
  access_token: string;
  userId?: UUID;
  userEmail?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(SqlUserRepository)
    private readonly userRepository: SqlUserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserCommand: SignInUserCommand): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(signInUserCommand.email);
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(
      signInUserCommand.password,
      user?.password as string,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      userId: user.id,
      email: user.email.value,
      roles: user.roles,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      userId: user?.id,
      userEmail: user?.email.value,
    };
  }

  async createUser(createUserCommand: CreateUserCommand): Promise<any> {
    const newUser = User.create(
      createUserCommand.email,
      createUserCommand.password,
      createUserCommand.roles,
      createUserCommand.confirmed,
      createUserCommand.id,
    );
    return await this.userRepository.insert(newUser);
  }

  async updateUser(updateUserCommand: UpdateUserCommand): Promise<any> {
    const user = await this.userRepository.findById(updateUserCommand.id);

    if (!user) throw new UnauthorizedException();

    user.cellPhone = updateUserCommand.cellPhone;
    user.taxId = !updateUserCommand.taxId
      ? undefined
      : Cpf.validate(updateUserCommand.taxId)
      ? Cpf.create(updateUserCommand.taxId)
      : Cnpj.validate(updateUserCommand.taxId)
      ? Cnpj.create(updateUserCommand.taxId)
      : undefined;
    user.name = updateUserCommand.name;
    return await this.userRepository.update(user);
  }

  async updateUserPass(updateUserCommand: SignInUserCommand): Promise<any> {
    const user = await this.userRepository.findByEmail(updateUserCommand.email);
    if (user && !user.password) {
      const hash = await bcrypt.hash(updateUserCommand.password, 10);
      user.password = hash;
      user.confirmed = true;
      return await this.userRepository.update(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
