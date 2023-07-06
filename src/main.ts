import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpExceptionFilter } from './common/httpException';
import { JwtTokenGuard } from './common/tokenGuard.guard';
import * as session  from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new JwtTokenGuard());
  app.use(
    session({
      secret: 'lwx',
      name: 'lwx.sId',
      rolling: true, // 每次请求接口都重置时间
      resave: false, // 是否每次都重新保存会话，建议false
      saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 有效期，单位是毫秒
        httpOnly: true, // 是否只用于http请求中获取
      }
  
    })
  )
  await app.listen(55111);
}
bootstrap();
