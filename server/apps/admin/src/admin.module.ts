import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from 'libs/cache';
import { CommonModule } from 'libs/common';
import { LogModule } from 'libs/log';
import { DbModule } from 'libs/db';
import { AuthModule } from 'libs/auth';
import { RedisSessionMiddleware } from 'shared/middleware/redis-session.middleware';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';
import { UserModule } from './system/user/user.module';
import { CrawlerModule } from './crawler/crawler.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 指定存储环境变量的文件, 靠前的文件拥有较高的优先级
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    RedisCacheModule,
    DbModule,
    CommonModule,
    LogModule,
    AuthModule,
    RoleModule,
    MenuModule,
    UserModule,
    CrawlerModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RedisSessionMiddleware({
          host: this.configService.get('REDIS_HOST'),
          port: Number(this.configService.get('REDIS_PORT')),
          password: this.configService.get('REDIS_PASSWORD'),
          database: Number(this.configService.get('REDIS_DB')),
          maxAge: Number(this.configService.get('SESSION_MAX_AGE')),
          secret: this.configService.get('SESSION_SECRET'),
        }),
      )
      .forRoutes('*');
  }
}
