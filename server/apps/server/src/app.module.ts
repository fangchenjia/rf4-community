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
import { TaskModule } from './schedule/task.module';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';
import { CommentModule } from './comment/comment.module';

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
    TaskModule,
    GameModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService, GameService],
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
