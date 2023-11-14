import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export type DictDocument = DocumentType<Dict>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Dict {
  @prop()
  @ApiProperty({ description: '字典项名称', example: '' })
  dictName: string;

  @prop()
  @ApiProperty({ description: '字典项值', example: '' })
  dictValue: string;

  @prop()
  @ApiProperty({ description: '字典项描述', example: '' })
  description: string;

  @prop({ default: 0 })
  @ApiProperty({ description: '排序', example: 0 })
  sort: number;

  @prop()
  @ApiProperty({ description: '字典项类型', example: ' ' })
  type: string;
}
