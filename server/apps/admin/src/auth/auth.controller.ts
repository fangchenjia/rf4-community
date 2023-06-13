import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { loginDto, registerDto } from './auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ReqUser } from './req-user.decorator';

@Controller('auth')
@ApiTags('用户授权')
export class AuthController {
  constructor(
    private jwtServer: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  // @Post('register')
  // @ApiOperation({ summary: '用户注册' })
  // async register(@Body() registerDto: registerDto) {
  //   const { username } = registerDto;
  //   // 判断用户名是否已经存在
  //   if (await this.userModel.findOne({ username })) {
  //     return {
  //       code: 1,
  //       message: '用户已存在',
  //     };
  //   } else {
  //     // 创建用户
  //     const user = await this.userModel.create(registerDto);
  //     return {
  //       code: 0,
  //       user,
  //       message: '注册成功',
  //     };
  //   }
  //   return registerDto;
  // }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local-admin'))
  async login(@Body() loginDto: loginDto, @Req() req) {
    return {
      accessToken: this.jwtServer.sign(String(req.user._id)),
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-admin'))
  async userInfo(@ReqUser() user: UserDocument) {
    return user;
  }
}
