import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.user = await this.authService.login(ctx.getArgs().loginInput);
    await super.logIn(request);
    return request;
  }
}
