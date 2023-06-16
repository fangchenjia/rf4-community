import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';

// 连接redis储存session
const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  database: Number(process.env.REDIS_DB),
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  ttl: Number(process.env.SESSION_MAX_AGE),
});

@Global()
@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // 使用session中间件
        session({
          store: redisStore,
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          rolling: true,
          cookie: { maxAge: Number(process.env.SESSION_MAX_AGE) * 1000 }, // 有效期，这里单位是毫秒 环境变量是秒
        }),
      )
      .forRoutes('*');
  }
  static forRoot(AuthType: string): DynamicModule {
    const controllers = [];
    if (AuthType === 'admin') {
      controllers.push(AdminAuthController);
    }
    return {
      module: AuthModule,
      imports: [PassportModule],
      controllers,
      providers: [LocalStrategy, JwtStrategy],
    };
  }
}
