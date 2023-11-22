import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Position } from './position.model';

export type PositionCommentDocument = DocumentType<PositionComment>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class PositionComment {
  @prop({ ref: () => Position })
  @ApiProperty({ description: '点位' })
  position: Ref<Position>;

  @prop()
  @ApiProperty({ description: '评论内容' })
  content: string;

  @prop({ ref: () => User })
  @ApiProperty({ description: '评论用户' })
  user: Ref<User>;

  @prop({ ref: () => User })
  @ApiProperty({ description: '被评论用户' })
  toUser: Ref<User>;
  
  @prop({ ref: () => PositionComment, default: [] })
  @ApiProperty({ description: '子评论' })
  children: Ref<PositionComment>[];

  @prop({ ref: () => PositionComment })
  @ApiProperty({ description: '父评论' })
  parent: Ref<PositionComment>;

  @prop({ ref: ()=> User})
  @ApiProperty({ description: '点赞用户' })
  likes: Ref<User>[];
}
