import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePositionCommentDto {
  @ApiProperty({ description: '评论内容' })
  @IsNotEmpty({ message: '评论内容不能为空' })
  @Length(1, 200, { message: '评论内容为1-200个字符' })
  content: string;

  @ApiProperty({ description: '点位Id' })
  position: string;

  @ApiProperty({ description: '父评论' })
  parent: string;

  @ApiProperty({ description: '被评论用户' })
  toUser: string;

  @ApiProperty({ description: '评论用户' })
  user: string;
}
