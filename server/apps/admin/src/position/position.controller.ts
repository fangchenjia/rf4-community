import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';
import { ApprovePositionDto, QueryPositionDto } from './position.dto';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';

@Controller('approve/position')
@ApiTags('点位模块')
@UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class PositionController {
  constructor(private readonly positionService: PositionService) {}
  @Get()
  @ApiOperation({ summary: '获取所有点位' })
  findAll(@Query() queryParam: QueryPositionDto) {
    return this.positionService.findAll(queryParam);
  }

  @Post()
  @ApiOperation({ summary: '审批' })
  @RequirePermission('approve:positionApprove:approve')
  approve(@Body() body: ApprovePositionDto) {
    return this.positionService.approve(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @RequirePermission('approve:positionApprove:delete')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }
}
