import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateOrUpdateRoleDto } from './role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';

@Controller('system/role')
@ApiTags('角色模块')
@UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '创建角色' })
  @RequirePermission('system:role:create')
  async create(@Body() createRoleDto: CreateOrUpdateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有角色' })
  @RequirePermission('system:role:list')
  async findAll() {
    return await this.roleService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @RequirePermission('system:role:update')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: CreateOrUpdateRoleDto,
  ) {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @RequirePermission('system:role:remove')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }
}
