import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CommonModule } from 'common/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from 'auth/auth';
// import { Cache } from 'cache-manager';
// import RedisStore from 'connect-redis';
// import * as session from 'express-session';

// import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Module({
  imports: [CommonModule, UsersModule, AuthModule.forRoot('admin')],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
// export class AdminModule implements NestModule {
//   constructor(
//     @Inject(CACHE_MANAGER)
//     private readonly cacheManager: Cache,
//   ) {}
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         // 使用session中间件
//         session({
//           store: new RedisStore({
//             client: this.cacheManager,
//           }),
//           secret: process.env.SESSION_SECRET,
//           resave: false, // 是否每次都重新保存会话，建议false
//           saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
//           cookie: {
//             maxAge: Number(process.env.SESSION_MAX_AGE),
//           },
//         }),
//       )
//       .forRoutes('*');
//   }
// }
