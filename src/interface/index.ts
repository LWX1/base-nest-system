import { Request, Response } from 'express';
// 请求参数req.query
export interface IParsedQs { [key: string]: number | undefined | string | string[] | IParsedQs | IParsedQs[] };

// 对象
export interface IObject<T> {
    [x: string]: T;
}

// 请求参数
export interface IExpressRequest extends Request {
}

// 返回值
export interface IExpressResponse extends Response {
}

// session.interface.ts
export interface ISessionData {
    code: string;
}
  