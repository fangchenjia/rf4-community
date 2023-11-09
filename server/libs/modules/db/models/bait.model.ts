import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = DocumentType<Bait>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Bait {
  @prop()
  @ApiProperty({ description: '鱼饵名称', example: '蚯蚓' })
  name: string;

  @prop()
  @ApiProperty({ description: '鱼饵图标' })
  icon: string;
}
