import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { SignIn } from '../../dtos/IN/sign-in.interface';
import SignInUserCommand from '../../domain/commands/sign-in-user.command';
import { AuthGuard } from 'src/common/core/guards/auth.guard';
import { Roles } from 'src/common/core/decorators/roles.decorator';
import { Role } from 'src/common/core/types/role';
import UpdateUserCommand from '../../domain/commands/update-user.command';
import { SignUp } from '../../dtos/IN/sign-up.interface';
import { UpdateUser } from '../../dtos/IN/update.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { UserOut } from '../../dtos/OUT/user-out.interface';
import { RolesGuard } from 'src/common/core/guards/roles.guard';
import { WithUser } from 'src/common/core/decorators/user.decorators';
import LoggedUser from '../../domain/models/loggedUser';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  // Route to login with user email and password.
  // it compares user input to the hashed password stored in db.
  @Post('login')
  async signIn(@Body() signIn: SignIn): Promise<any> {
    const user = new SignInUserCommand(signIn.email, signIn.password);
    const signInUser = await this.authService.signIn(user);
    return signInUser;
  }

  // Private route to access user.
  // A valid jwt token is checked by AuthGuard
  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Request() req: any) {
    return req.user;
  }

  //Route to update other user properties. Protected by AuthGuard
  // which checks if the req.headers have a valid jwt token,
  // and also by the RolesGuard, which checks if
  // the context of the request has a metadata (@Roles).
  // In case it returns false, by default it returns a 403,"Forbidden resource"

  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUser(
    @Body() updateUser: UpdateUser,
    @WithUser() loggedUser: LoggedUser,
  ): Promise<UserOut> {
    const user = new UpdateUserCommand(
      loggedUser.userId,
      updateUser.email,
      updateUser.name,
      updateUser.cellPhone,
      updateUser.confirmed,
      updateUser.taxId,
    );
    const userUpdated = await this.authService.updateUser(user);
    return UserMapper.modelToUserOut(userUpdated);
  }

  //Route to update user password and save hash password in db
  @Post('sign')
  async signUp(@Body() signUp: SignUp): Promise<UserOut> {
    const user = new SignInUserCommand(signUp.email, signUp.password);
    const updatedUserPass = await this.authService.updateUserPass(user);
    return UserMapper.modelToUserOut(updatedUserPass);
  }
}
