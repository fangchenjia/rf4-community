import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'libs/db/models/user.model';
import { updateInfoDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-info')
  @ApiOperation({ summary: '更新用户信息' })
  @UseGuards(AuthGuard('USER_JWT'))
  async updateInfo(
    @ReqUser() user: UserDocument,
    @Body() updateInfo: updateInfoDto,
  ) {
    return await this.userService.updateInfo(user.id, updateInfo);
  }
}
