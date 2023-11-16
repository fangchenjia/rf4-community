import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Map } from './map.model';
import { Fish } from './fish.model';
import { Bait } from './bait.model';

export type UserDocument = DocumentType<Position>;
export type mapStatusEnum =
  | 'approved'
  | 'disabled'
  | 'deleted'
  | 'pendingReview'
  | 'rejected'; // 地图状态

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Position {
  @prop()
  @ApiProperty({ description: '点位标题', example: '83145暴口' })
  title: string;

  @prop()
  @ApiProperty({ description: '关键字', example: '刷水底' })
  keywords: string[];

  @prop({ ref: () => User })
  @ApiProperty({ description: '作者' })
  author: Ref<User>;

  @prop({ ref: () => Map })
  @ApiProperty({ description: '地图' })
  map: Ref<Map>;

  @prop({ ref: () => Fish })
  @ApiProperty({ description: '鱼' })
  fish: Ref<Fish>[];

  @prop()
  @ApiProperty({ description: '鱼饵' })
  baits: string;

  @prop()
  @ApiProperty({ description: '卡米' })
  distance: string;

  @prop()
  @ApiProperty({ description: '引线' })
  line: string;

  @prop()
  @ApiProperty({ description: '钩子' })
  hook: string;

  @prop()
  @ApiProperty({ description: '经纬度' })
  position: number[];

  @prop()
  @ApiProperty({ description: '钓具' })
  fishingTackle: string;

  @prop()
  @ApiProperty({ description: '钓组' })
  fishingGroup: string;

  @prop()
  @ApiProperty({ description: '描述' })
  description: string;

  @prop()
  @ApiProperty({ description: '标签' })
  tags: string[];

  @prop()
  @ApiProperty({ description: '时间' })
  time: string;

  @prop()
  @ApiProperty({ description: '温度' })
  temperature: string;

  @prop()
  @ApiProperty({ description: '鱼获图片' })
  fishImages: string[];

  @prop()
  @ApiProperty({ description: '装备图片' })
  equipmentImages: string[];

  @prop()
  @ApiProperty({ description: 'canvas数据' })
  canvasJson: string;

  @prop()
  @ApiProperty({ description: '状态' })
  status: mapStatusEnum;

  @prop({ ref: () => User })
  @ApiProperty({ description: '点赞用户id' })
  likes: Ref<User>[];

  @prop({ default: 0 })
  @ApiProperty({ description: '查看数量' })
  views: number;
}
