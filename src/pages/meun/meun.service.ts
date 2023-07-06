import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/components/pages/pagination';
import { PaginationService } from 'src/components/pages/paginationService';
import { IObject, IParsedQs } from 'src/interface';
import { Menu } from 'src/mysql/menu.entity';
import { RoleMenu } from 'src/mysql/role_menu.entity';
import { User } from 'src/mysql/user.entity';
import { GeneralException } from 'src/utils/generalException';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly meunRepository: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}
  async create(params: object) {
    try {
      return await this.meunRepository.insert(params);
    }catch(error ) {
      if(error instanceof Error) {
        GeneralException(error.message);
      }
      return error;
    }
  }

  async findAll(params: IParsedQs): Promise<Pagination<Menu>> {
    const { pageNum, pageSize, name } = params;
    return new PaginationService(this.meunRepository).paginate(
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
    return this.meunRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateMeunDto: IObject<string>) {
    return (await this.meunRepository.update({ id: id }, updateMeunDto)).affected;
  }

  async remove(id: number) {
    return (await this.meunRepository.delete(id)).affected;
  }

  async removeList(id: number[]) {
    return (await this.meunRepository.delete(id)).affected;
  }

  // 获取角色菜单树
  async getRoleTree(user: any) {
    const {userId} = user;
    
    const users = await this.userRepository.findOne({
      where: { id: userId},
    });
    const roleId = users?.roleId;
    // 超级管理员 获取所有的权限
    if(users?.id === 1 || roleId === 1) {
      const list = await this.meunRepository.find();
      const tree = this.toTree(list);
      return tree;
    }
    if(!roleId) {
      return [ ];
    }
    const roleMenu = await this.roleMenuRepository.findOne({
      where: { roleId: roleId},
    });

    const menuParentIds = roleMenu?.menuParentIds;
    if(!menuParentIds) return [];
    const menuParentIdsList = menuParentIds.split(',');
    const list = await this.meunRepository.find();
    const tree = this.toTree(list, menuParentIdsList);
    return tree;
  }

  // 获取菜单树
  async getTree() {
    const list = await this.meunRepository.find();
    return this.toTree(list);
  }

  /**
   * 
   * @param data 所有的树节点
   * @param menuIdList 权限后的树节点ids
   * @returns 
   */

  toTree(data: Menu[], menuIdList?: string[]) {
    const result: Menu[] = [];
    if (!Array.isArray(data)) {
      return result;
    }
    
    const map: IObject<Menu> = {};
    data.forEach((item) => {
      map[item.id] = item;
    });
    data.forEach((item) => {
      const parent = map[item.parentId];
      if (parent) {
        // 判断是否有权限
        if(menuIdList) {
          if(menuIdList.includes(item.id.toString())) {
            (parent.children || (parent.children = [])).push(item);
          }
        } else {
          (parent.children || (parent.children = [])).push(item);
        }
        
      } else {
        if(menuIdList) {
          if(menuIdList.includes(item.id.toString())) {
            result.push(item);
          }
        }else {
          result.push(item);
        }
        
      }
    });
    return result;
  }
}
