import { Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { MenuService } from './meun.service';
import { IExpressRequest, IObject } from 'src/interface';
import deleteQuery from 'src/common/deleteQuery';

@Controller('menu')
export class MeunController {
  constructor(private readonly MenuService: MenuService) {}

  @Post()
  create(@Body() createMeunDto:object) {
    return this.MenuService.create(createMeunDto);
  }

  @Get()
  async findAll(@Request() req: IExpressRequest) {
    return await this.MenuService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.MenuService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @deleteQuery() @Body() updateMeunDto: IObject<string>) {
    return this.MenuService.update(+id, updateMeunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MenuService.remove(+id);
  }

  @Post('delete/list')
  removeList(@Body() body: { ids: number[] }) {
    return this.MenuService.removeList(body.ids);
  }
  
  // 获取角色菜单树
  @Get('role/tree/list')
  async getRoleTree(@Request() req: IExpressRequest) {
    return await this.MenuService.getRoleTree(req.user);
  }

  // 获取所有菜单树
  @Get('tree/list')
  async getTree(@Request() req: IExpressRequest) {
    // console.log(req.user, 5555555)
    return await this.MenuService.getTree();
  }
}
