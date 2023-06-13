import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'libs/db';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 指定存储环境变量的文件, 靠前的文件拥有较高的优先级
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    DbModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore as any,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB, //目标库,
        auth_pass: process.env.REDIS_PASSPORT, // 密码,没有可以不写
      }),
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule, CacheModule],
})
export class CommonModule {}
