import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { FindUserDto, UpdateUserDto } from './user.dto';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';

@Controller('system/user')
@ApiTags('用户模块')
@UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  @ApiOperation({ summary: '初始化用户' })
  init() {
    return this.userService.init();
  }

  @Get('perm')
  @ApiOperation({ summary: '获取用户权限列表' })
  async permmenu(@ReqUser() user) {
    return await this.userService.getPerms(user.id);
  }

  @Get('menu')
  @ApiOperation({ summary: '获取用户菜单列表' })
  async menus(@ReqUser() user) {
    return await this.userService.getTreeMenus(user.id);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @RequirePermission('system:user:list')
  findAll(@Query() queryParam: FindUserDto) {
    return this.userService.findAll(queryParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @RequirePermission('system:user:update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @RequirePermission('system:user:remove')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
