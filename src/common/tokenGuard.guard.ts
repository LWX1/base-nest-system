import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    // const token = this.getTokenFromHeader(req);
    // if(!token) {
    //   throw new UnauthorizedException()
    // }
    try {
      
      return true
    }catch(e) {
      throw new UnauthorizedException();
    }
  }
}
