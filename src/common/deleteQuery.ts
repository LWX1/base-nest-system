import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const deteleQuery = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    delete request.body.updateTime;
    delete request.body.createTime;
    Object.keys(request.body).forEach((key) => {
        if(request.body[key] === '') {
            request.body[key] = null;
        }
    })
    return request.body;
  });

export default deteleQuery;
