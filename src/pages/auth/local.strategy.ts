import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GeneralException } from 'src/utils/generalException';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<Object> {
    if(!username || !password) {
      GeneralException('用户名或密码不能为空');
    }
    return {
      username,
      password,
    };
  }
}