import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/components/pages/pagination';
import { PaginationService } from 'src/components/pages/paginationService';
import { IObject, IParsedQs } from 'src/interface';
import { Role } from 'src/mysql/Role.entity';
import { RoleMenu } from 'src/mysql/role_menu.entity';
import { GeneralException } from 'src/utils/generalException';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}
  async create(params: object) {
    try {
      return await this.roleRepository.insert(params);
    }catch(error ) {
      if(error instanceof Error) {
        GeneralException(error.message);
      }
      return error;
    }
  }

  async findAllNoPage() {
    return await this.roleRepository.find();
  }

  async findAll(params: IParsedQs): Promise<Pagination<Role>> {
    const { pageNum, pageSize, name } = params;
    return new PaginationService(this.roleRepository).paginate(
      pageNum as number,
      pageSize as number,
      {
        query: {
          name: `%${name || ''}%`,
        },

        queryStr: 'name like :name ',
      },
    );
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateMeunDto: IObject<string>) {
    const role = new Role();
    role.name = updateMeunDto.name;
    return (await this.roleRepository.update({ id: id }, role)).affected;
  }

  async remove(id: number) {
    return (await this.roleRepository.delete(id)).affected;
  }

  async removeList(id: number[]) {
    return (await this.roleRepository.delete(id)).affected;
  }

  // 获取角色菜单树
  async getTree(query: IParsedQs) {
    const role = await this.roleMenuRepository.findOne({
      where: { roleId: Number(query.id) },
    });
    return role;
  }

  // 保存角色对应菜单
  async saveTree(body: { id: number; menuIds: number[]; menuParentIds: number[]; }) {
    const { id, menuIds, menuParentIds } = body;
    const bool = await this.roleMenuRepository.findOne({
      where: { roleId: id },
    })
    if(bool === null) {
      return await this.roleMenuRepository.insert({
        roleId: id,
        menuIds: menuIds.join(','),
        menuParentIds: menuParentIds.join(','),
      })
    }else {
      return await this.roleMenuRepository.update({ roleId: id }, {
        menuIds: menuIds.join(','),
        menuParentIds: menuParentIds.join(','),
      })
    }
  }
}
