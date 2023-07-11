import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { RedisCacheModule } from 'libs/cache';

@Global()
@Module({
  imports: [RedisCacheModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
