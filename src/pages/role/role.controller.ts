import { Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { IExpressRequest, IObject } from 'src/interface';
import { RoleMenu } from 'src/mysql/role_menu.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto:object) {
    return this.RoleService.create(createRoleDto);
  }

  @Get()
  async findAll(@Request() req: IExpressRequest) {
    return await this.RoleService.findAll(req.query);
  }

  @Get("all/list")
  async findAllNoPage() {
    return await this.RoleService.findAllNoPage();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.RoleService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: IObject<string>) {
    return this.RoleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(+id);
  }

  @Post('delete/list')
  removeList(@Body() body: { ids: number[] }) {
    return this.RoleService.removeList(body.ids);
  }

  // 获取角色对应菜单树
  @Get('tree/list')
  async getTree(@Request() req: IExpressRequest) {
    const result = await this.RoleService.getTree(req.query);
    if (!result) return [];
    return (result as RoleMenu).menuIds.split(',').map(item => +item);
  }

  // 保存角色对应菜单树
  @Post('tree/save')
  async saveTree(@Body() body: { id: number, menuIds: number[], menuParentIds: number[] }) {
    return await this.RoleService.saveTree(body );
  }

}
