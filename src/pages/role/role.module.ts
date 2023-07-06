import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/mysql/Role.entity';
import { RoleMenu } from 'src/mysql/role_menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleMenu])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
