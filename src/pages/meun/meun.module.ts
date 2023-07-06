import { Module } from '@nestjs/common';
import { MenuService } from './meun.service';
import { MeunController } from './meun.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/mysql/menu.entity';
import { User } from 'src/mysql/user.entity';
import { RoleMenu } from 'src/mysql/role_menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, User, RoleMenu])],
  providers: [MenuService],
  controllers: [MeunController],
})
export class MeunModule {}
