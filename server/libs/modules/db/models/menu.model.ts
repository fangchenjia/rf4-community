import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export type MenuDocument = DocumentType<Menu>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Menu {
  @prop()
  @ApiProperty({ description: '菜单名称', example: '用户管理' })
  name: string;

  @prop()
  @ApiProperty({ description: '路由', example: '/user' })
  path: string;

  @prop()
  @ApiProperty({ description: '文件路径', example: 'user.vue' })
  component: string;

  @prop()
  @ApiProperty({ description: '权限标识', example: 'user:list' })
  permission: string;

  @prop()
  @ApiProperty({ description: '图标', example: 'user' })
  icon: string;

  @prop({ default: 0 })
  @ApiProperty({ description: '排序', example: 1 })
  sort: number;

  @prop({ default: false })
  @ApiProperty({ description: '是否隐藏', example: false })
  hidden: boolean;

  @prop({ default: false })
  @ApiProperty({ description: '是否禁用', example: false })
  disabled: boolean;

  @prop({ ref: () => Menu })
  @ApiProperty({ description: '父级菜单' })
  parent: Ref<Menu>;

  @prop()
  @ApiProperty({ description: '类型', example: '0 目录 1 菜单 2 按钮' })
  type: number;

  @prop({ default: false })
  @ApiProperty({ description: '是否缓存' })
  keepAlive: boolean;

  @prop({ default: false })
  @ApiProperty({ description: '是否是外链' })
  externalLink: boolean;
}
