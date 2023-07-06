import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './pages/auth/auth.module';
import { UsersModule } from './pages/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './mysql/config';
import { MeunModule } from './pages/meun/meun.module';
import { RoleModule } from './pages/role/role.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(MysqlConfig),
    AuthModule,
    UsersModule,
    MeunModule,
    RoleModule,
  ],
})
export class AppModule {}
