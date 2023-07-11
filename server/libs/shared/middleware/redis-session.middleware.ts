import { Request, Response, NextFunction } from 'express';

import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { Redis } from 'ioredis';

type RedisOption = {
  port: number;
  host: string;
  password: string;
  database: number;
  maxAge: number;
  secret: string;
};

export function RedisSessionMiddleware(redisOption: RedisOption) {
  // 连接redis储存session
  const redisClient = new Redis({
    port: redisOption.port,
    host: redisOption.host,
    password: redisOption.password,
  });

  const redisStore = new RedisStore({
    client: redisClient,
    ttl: redisOption.maxAge,
  });
  const fn = session({
    store: redisStore,
    secret: redisOption.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: redisOption.maxAge * 1000 }, // 有效期，这里单位是毫秒 环境变量是秒
  });
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next);
  };
}
