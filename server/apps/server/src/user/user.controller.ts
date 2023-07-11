import { ConfigService } from '@nestjs/config';
import {
  RedisCacheService,
  generateAccessTokenKey,
  generateRefreshTokenKey,
} from 'libs/cache';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { registerDto, loginDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'libs/auth';
import { ReqUser } from 'shared/decorators/req-user.decorator';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(
    private redisCacheService: RedisCacheService, // 缓存
    private authService: AuthService, // jwt
    private configService: ConfigService, // 配置
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, // 用户模型
  ) {}
}
