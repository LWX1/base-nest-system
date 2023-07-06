import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GeneralException } from 'src/utils/generalException';
import { decrypt } from 'src/utils/aes';
import { Timestamp } from 'typeorm';


interface IpropsQuery{
    username: string,
    password: string,
    code: string,
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(query: IpropsQuery, session: { code: string; }): Promise<Object | undefined> {
        const {username, password, code} = query;
        if(!code || !session.code) {
            GeneralException('验证码不能为空');
        }else if(code.toLowerCase() !== session.code.toLowerCase()) {
            GeneralException('验证码不正确');
        }
        
        const user = await this.usersService.findOne(username);
        if (user && user.password === decrypt(password)) {
            const { password, ...result } = user;
            return this.login(result)
        }else {
            GeneralException('用户名或密码错误');
        }
        return undefined;
        
    }

    login(user: { id: any; username: any; roleId?: number; status: any; create_time?: Timestamp; update_time?: Timestamp; role?: any; }) {
        const {id, username, role, status} = user;
        const payload = { userId: id, username, role, status };
        const result = this.jwtService.sign(payload);
       
        return {
            access_token: result,
        };
    }
}
