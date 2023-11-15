import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { RedisCacheModule } from 'libs/cache';
import { OssService } from './oss.service';

@Global()
@Module({
  imports: [RedisCacheModule],
  controllers: [CommonController],
  providers: [CommonService, OssService],
  exports: [CommonService],
})
export class CommonModule {}
