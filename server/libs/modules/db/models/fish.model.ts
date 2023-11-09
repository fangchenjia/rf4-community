import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = DocumentType<Fish>;

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
}
