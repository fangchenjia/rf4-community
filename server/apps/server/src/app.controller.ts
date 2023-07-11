import { Controller, Get, Inject, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from 'libs/db/db.service';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'libs/db/models/user.model';
import { RedisCacheService, generateAccessTokenKey } from 'libs/cache';
import { LogService } from 'libs/log';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DbService,
    private readonly redisCacheService: RedisCacheService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, // 用户模型
    @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
  ) {}

  @Get()
  async getHello(@Session() session: Record<string, any>) {
    session.views = session.views ? session.views + 1 : 1;
    // throw new ApiException(ErrorEnum.INVALID_TOKEN);
    this.redisCacheService.cacheSet(
      generateAccessTokenKey('dfdfdf'),
      'dfdadasdafdf',
    );
    return await this.userModel.findOne({ mobile: '18711003418' });
  }
}
