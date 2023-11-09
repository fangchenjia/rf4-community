import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Fish } from './fish.model';

export type UserDocument = DocumentType<Map>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Map {
  @prop()
  @ApiProperty({ description: '地图名称', example: '阿和图吧河' })
  name: string;

  @prop()
  @ApiProperty({ description: '地图标识', example: 'mosquito_lake' })
  value: string;

  @prop()
  @ApiProperty({ description: '地图图片' })
  image: string;

  @prop()
  @ApiProperty({ description: '地图封面' })
  cover: string;

  @prop()
  @ApiProperty({ description: '地图描述', example: 'xxxxx' })
  description: string;

  @prop({ ref: () => Fish })
  @ApiProperty({ description: '鱼种' })
  fish: Ref<Fish>[];
}
