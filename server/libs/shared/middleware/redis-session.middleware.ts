import { Request, Response, NextFunction } from 'express';

import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';

type RedisOption = {
  port: number;
  host: string;
  password: string;
  database: number;
  maxAge: number;
  secret: string;
};

export function RedisSessionMiddleware(redisOption: RedisOption) {
  const client = createClient({
    url: `redis://default:${redisOption.password}@${redisOption.host}:${redisOption.port}`,
  });
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.connect();

  const redisStore = new RedisStore({
    client: client,
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
