import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

/***
 *
 * 用于判断对象存储的图片是否被使用
 */
export type ImageDocument = DocumentType<Image>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Image {
  @prop()
  @ApiProperty({ description: '图片名称' })
  imageName: string;

  @prop()
  @ApiProperty({ description: '图片类型' })
  type: string;

  @prop()
  @ApiProperty({ description: '是否被使用' })
  used: boolean;

  @prop()
  @ApiProperty({ description: '图片地址' })
  imageUrl: string;
}
