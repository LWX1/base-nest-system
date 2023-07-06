import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface IpropsData<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IpropsData<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          msg: '成功',
          success: true,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
