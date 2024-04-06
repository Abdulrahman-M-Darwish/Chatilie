import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request.isAuthenticated) {
      return request.isAuthenticated();
    } else {
      return request.extra.user;
    }
  }
}
