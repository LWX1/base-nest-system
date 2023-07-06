
import { ObjectLiteral, Repository } from 'typeorm';
import { Pagination } from './pagination';

interface ITypePrarams {
  select?: string[];
  order?: string;

}

export class PaginationService<T extends ObjectLiteral>{
  private repository: Repository<T>;
  constructor(repository: Repository<T>) {
    
    this.repository = repository;
    
  }

  async paginate(
    pageNum: number = 1,
    pageSize: number = 10,
    where = {
      query: {},
      queryStr: '',
    },
    others: ITypePrarams={}
  ): Promise<Pagination<T>> {
    const query = this.repository.createQueryBuilder();
    if (where.queryStr) {
      query.andWhere(where.queryStr, where.query);
    }
    const {order, select} = others;
    if (order) {
      query.orderBy(order);
    }
   
    if (select) {
      query.select(select);
    }
    // console.log('query', where,  query.getSql())
    const [list, total] = await query
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
        list,
        total,
        pageNum: Number(pageNum),
        pageSize: Number(pageSize),
      }
  }
}
