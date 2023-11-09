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

  @prop({ ref: () => User })
  @ApiProperty({ description: '作者' })
  author: Ref<User>;

  @prop({ ref: () => Map })
  @ApiProperty({ description: '地图' })
  map: Ref<Map>;

  @prop({ ref: () => Fish })
  @ApiProperty({ description: '鱼' })
  fish: Ref<Fish>[];

  @prop({ ref: () => Bait })
  @ApiProperty({ description: '鱼饵' })
  baits: string[] | Ref<Bait>[];

  @prop()
  @ApiProperty({ description: '经纬度' })
  position: string;

  @prop()
  @ApiProperty({ description: '描述' })
  description: string;

  @prop()
  @ApiProperty({ description: '图片' })
  images: string[];

  @prop()
  @ApiProperty({ description: 'canvas数据' })
  canvasJson: string;

  @prop()
  @ApiProperty({ description: '状态' })
  status: mapStatusEnum;
}
