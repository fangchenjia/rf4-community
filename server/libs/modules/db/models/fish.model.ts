import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = DocumentType<Fish>;
export type rareEnum = '1' | '2' | '3';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Fish {
  @prop()
  @ApiProperty({ description: '鱼种名称', example: '拟鲤' })
  name: string;

  @prop()
  @ApiProperty({ description: '鱼图标' })
  icon: string;

  @prop()
  @ApiProperty({ description: '鱼描述', example: 'xxxxx' })
  description: string;

  @prop()
  @ApiProperty({ description: '稀有度', example: '' })
  rare: rareEnum;

  @prop()
  @ApiProperty({ description: '上星重量', example: '100' })
  starWeight: string;

  @prop()
  @ApiProperty({ description: '上蓝重量', example: '100' })
  blueWeight: string;
}
