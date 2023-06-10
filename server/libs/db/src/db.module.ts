import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from './models/user.model';
const models = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    // q: 为什么这里要用 TypegooseModule.forRootAsync() 而不是 TypegooseModule.forRoot() ?
    // a: 因为 TypegooseModule.forRoot() 无法使用 ConfigModule 的配置
    TypegooseModule.forRootAsync({
      useFactory() {
        const ENV = process.env;
        const DB_URL = `mongodb://${ENV.DB_USER}:${ENV.DB_USER_PWD}@${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
        return {
          uri: DB_URL,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
