import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateOrUpdateMenuDto {
  @ApiProperty({ description: '父菜单Id' })
  parent: string;

  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  name: string;

  @ApiProperty({ description: '菜单路径' })
  path: string;

  @ApiProperty({ description: '组件路径' })
  component: string;

  @ApiProperty({ description: '权限标识' })
  permission: string;

  @ApiProperty({ description: '图标' })
  icon: string;

  @ApiProperty({ description: '排序' })
  sort: number;

  @ApiProperty({ description: '是否隐藏' })
  hidden: boolean;

  @ApiProperty({ description: '是否禁用' })
  disabled: boolean;

  @ApiProperty({ description: '是否缓存' })
  keepAlive: boolean;

  @ApiProperty({ description: '是否是外链' })
  externalLink: boolean;

  @ApiProperty({ description: '类型' })
  @IsNotEmpty({ message: '类型不能为空' })
  type: number;
}
