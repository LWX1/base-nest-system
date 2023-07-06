import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { IExpressRequest, IObject } from 'src/interface';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getList(@Request() req:IExpressRequest) {
    return await this.usersService.findAll(req.query);
  }
  @Post()
  create(@Body() createRoleDto:object) {
    return this.usersService.create(createRoleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneId(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: IObject<string>) {
    return this.usersService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('delete/list')
  removeList(@Body() body: { ids: number[] }) {
    return this.usersService.removeList(body.ids);
  }

}
