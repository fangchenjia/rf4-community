import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateOrUpdateRoleDto {
  @ApiProperty({ description: '角色名称', example: '超级管理员' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Length(2, 20, { message: '角色名称长度为2-20位' })
  name: string;

  @ApiProperty({ description: '角色描述', example: '超级管理员' })
  @IsNotEmpty({ message: '角色描述不能为空' })
  @Length(2, 20, { message: '角色描述长度为2-20位' })
  description: string;

  @ApiProperty({ description: '角色标识', example: 'admin' })
  @IsNotEmpty({ message: '角色标识不能为空' })
  value: string;

  @ApiProperty({ description: '权限列表' })
  @IsNotEmpty({ message: '权限列表不能为空' })
  menus: string[];
}
