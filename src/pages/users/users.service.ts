import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/components/pages/pagination';
import { PaginationService } from 'src/components/pages/paginationService';
import { IObject, IParsedQs } from 'src/interface';
import { User } from 'src/mysql/user.entity';
import { GeneralException } from 'src/utils/generalException';
import { setTypeORMColumn } from 'src/utils/setTypeORMColumn';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(params: object) {
    try {
      return await this.UserRepository.insert(params);
    }catch(error ) {
      if(error instanceof Error) {
        GeneralException(error.message);
      }
      return error;
    }
  }


  async findOne(username: string): Promise<User | null> {
    return this.UserRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOneId(id: number): Promise<User | null> {
    return this.UserRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(params: IParsedQs): Promise<Pagination<User>> {
    const { pageNum, pageSize, username } = params;
    // console.log(params, 'params')
    return new PaginationService(this.UserRepository).paginate(pageNum as number, pageSize as number, {
      query: {
        username: `%${username || ""}%`,
      },
      
      queryStr: 'username like :username',
    }, {
      select: setTypeORMColumn(['username', 'id', 'roleId', 'status', 'createTime', 'updateTime'], 'User'),
    });
  };

  async update(id: number, updateMeunDto: IObject<string>) {

    return (await this.UserRepository.update({ id: id }, updateMeunDto)).affected;
  }


  async remove(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }


  async removeList(id: number[]) {
    return (await this.UserRepository.delete(id)).affected;
  }

}
