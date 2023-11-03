import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { PageOptionsDto } from 'shared/dto/page.dto';

export class UpdateUserDto {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  _id: string;

  @ApiProperty({ description: '角色名称', example: '超级管理员' })
  @Length(2, 20, { message: '角色名称长度为2-20位' })
  nickname: string;

  @ApiProperty({ description: '备注', example: '超级管理员' })
  @Length(0, 20, { message: '备注长度为0-20位' })
  remark: string;

  @ApiProperty({ description: '角色标识', example: 'admin' })
  roles: string[];
}

export class FindUserDto extends PageOptionsDto {
  @ApiProperty({ description: 'id' })
  _id: string;

  @ApiProperty({ description: '昵称', example: '超级管理员' })
  nickname;

  @ApiProperty({ description: '手机号', example: '12733123' })
  mobile;
}
