import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateOrUpdateDictDto, QueryDictDto } from './dict.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';

@Controller('system/dict')
@ApiTags('字典模块')
@UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post()
  @ApiOperation({ summary: '创建字典项' })
  @RequirePermission('system:dict:create')
  create(@Body() createDictDto: CreateOrUpdateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get()
  @ApiOperation({ summary: '获取字典项' })
  @RequirePermission('system:dict:list')
  findAll(@Query() queryParam: QueryDictDto) {
    return this.dictService.findAll(queryParam);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新菜单' })
  @RequirePermission('system:dict:update')
  update(
    @Param('id') id: string,
    @Body() updateDictDto: CreateOrUpdateDictDto,
  ) {
    return this.dictService.update(id, updateDictDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @RequirePermission('system:dict:remove')
  remove(@Param('id') id: string) {
    return this.dictService.remove(id);
  }
}
