import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class updateInfoDto {
  @ApiProperty({ description: '昵称', example: 'nick1' })
  @Length(1, 20, { message: '昵称长度为1-20位' })
  nickname: string;

  @ApiProperty({ description: '头像' })
  avatar: string;

  @ApiProperty({ description: '描述' })
  @Length(0, 30, { message: '描述长度为0-30位' })
  description: string;
}
