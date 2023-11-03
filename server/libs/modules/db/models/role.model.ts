import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Menu } from './menu.model';

export type UserDocument = DocumentType<Role>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Role {
  @prop()
  @ApiProperty({ description: '角色名称', example: '管理员' })
  name: string;

  @prop()
  @ApiProperty({ description: '角色标识', example: 'admin' })
  value: string;

  @prop()
  @ApiProperty({ description: '角色描述', example: '管理员' })
  description: string;

  @prop({ ref: () => Menu })
  @ApiProperty({ description: '菜单列表' })
  menus: Ref<Menu>[];
}
