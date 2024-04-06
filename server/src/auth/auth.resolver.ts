import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { User } from 'src/users/entities/user.entity';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => User)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('req') context,
  ) {
    return context.user;
  }
  @Mutation(() => User)
  async signup(
    @Args('signupInput') signupInput: SignupInput,
    @Context('req') context,
  ) {
    const user = await this.authService.signup(signupInput);
    context.session.passport = { user: user.id };
    return user;
  }
  @UseGuards(IsAuthenticatedGuard)
  @Mutation(() => String)
  async logout(@Context('req') context) {
    const logoutError = await new Promise((resolve) =>
      context.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );
    if (logoutError) {
      throw new InternalServerErrorException('Could not log out user');
    }
    return 'OK';
  }
}
