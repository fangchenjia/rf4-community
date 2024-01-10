import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class SubmitPointDto {
  @ApiProperty({ description: '点位标题' })
  @IsNotEmpty({ message: '点位标题不能为空' })
  title: string;

  @ApiProperty({ description: '地图' })
  @IsNotEmpty({ message: '地图不能为空' })
  map: string;

  @ApiProperty({ description: '鱼' })
  fish: string[];

  @ApiProperty({ description: '鱼饵' })
  baits: string;

  @ApiProperty({ description: '卡米' })
  distance: string;

  @ApiProperty({ description: '引线' })
  line: string;

  @ApiProperty({ description: '钩子' })
  hook: string;

  @ApiProperty({ description: '经纬度' })
  position: number[];

  @ApiProperty({ description: '钓具' })
  fishingTackle: string;

  @ApiProperty({ description: '钓组' })
  fishingGroup: string;

  @ApiProperty({ description: '描述' })
  description: string;

  @ApiProperty({ description: '标签' })
  tags: string[];

  @ApiProperty({ description: '时间' })
  time: string;

  @ApiProperty({ description: '温度' })
  temperature: string;

  @ApiProperty({ description: '鱼获图片' })
  fishImages: string[];

  @ApiProperty({ description: '装备图片' })
  equipmentImages: string[];

  @ApiProperty({ description: 'canvas数据' })
  canvasJson: string;

  @ApiProperty({ description: '转速' })
  speed: string;

  @ApiProperty({ description: '深度' })
  depth: string;
}

export class PointDetailDto {
  @ApiProperty({ description: '点位ID' })
  @IsNotEmpty({ message: '点位ID不能为空' })
  _id: string;
}

export class QueryUserDto {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  _id: string;
}

export class QueryPointsDto {
  @ApiProperty({ description: '地图' })
  @IsNotEmpty({ message: '地图不能为空' })
  map: string;

  @ApiProperty({ description: '鱼种', required: false })
  fish: string;
}

export class QueryUserRankDto {
  @ApiProperty({ description: '时间类型', required: false })
  timeType?: '' | 'month';
}
