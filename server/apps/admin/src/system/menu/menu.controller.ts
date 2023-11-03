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
import { MenuService } from './menu.service';
import { CreateOrUpdateMenuDto } from './menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';

@Controller('system/menu')
@ApiTags('菜单模块')
@UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: '创建菜单' })
  @RequirePermission('system:menu:create')
  create(@Body() createMenuDto: CreateOrUpdateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有菜单' })
  @RequirePermission('system:menu:list')
  findAll() {
    return this.menuService.findAll();
  }

  @Get('treeMenu')
  @ApiOperation({ summary: '获取所有菜单（树形式）' })
  async getTreeMenu() {
    return this.menuService.menusToTree(await this.menuService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新菜单' })
  @RequirePermission('system:menu:update')
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: CreateOrUpdateMenuDto,
  ) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @RequirePermission('system:menu:remove')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
