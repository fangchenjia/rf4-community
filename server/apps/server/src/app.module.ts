import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from 'libs/cache';
import { DbModule } from 'libs/db';
import { RedisSessionMiddleware } from 'shared/middleware/redis-session.middleware';
import { CommonModule } from 'libs/common';
import { LogModule } from 'libs/log';
import { AuthModule } from 'libs/auth';
import { PointModule } from './point/point.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './schedule/task.service';

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
    PointModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {
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
