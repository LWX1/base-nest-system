import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// 数据库配置
export const MysqlConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'wx',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
}