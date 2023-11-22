import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class QueryPositionCommentDto {
  @ApiProperty({ description: '点位Id' })
  @IsNotEmpty({ message: '点位Id不能为空' })
  position: string;
}
