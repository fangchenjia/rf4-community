import { prop, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Role } from './role.model';
export type UserDocument = DocumentType<User>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiProperty({ description: '手机号', example: '18711003418' })
  mobile: string;

  @prop({
    // 从数据库中查询时默认不返回密码
    select: false,
    get: (val) => val,
    // 存入数据库时对密码进行散列
    set: (val) => (val ? hashSync(val) : val),
  })
  @ApiProperty({ description: '密码', example: 'pass1' })
  password: string;

  @prop()
  @ApiProperty({ description: '昵称', example: 'nick1' })
  nickname: string;

  @prop({ ref: () => Role })
  @ApiProperty({ description: '角色' })
  roles: Ref<Role>[];

  @prop()
  @ApiProperty({ description: '头像' })
  avatar: string;

  @prop({ default: 0 })
  @ApiProperty({ description: '状态', example: '0 启用 1 禁用' })
  status: number;

  @prop()
  @ApiProperty({ description: '描述' })
  description: string;

  @prop()
  @ApiProperty({ description: '备注，管理员可见' })
  remark: string;
}

/**
 *  备注：
 * @prop({ type: () => Role }): 这个装饰器用于定义一个属性，该属性是一个Job类型的数组。在数据库中，该属性将被存储为一个包含Job对象的数组。这种方式不会在数据库中创建引用关系，而是直接将对象嵌入到数组中。
 * @prop({ ref: () => Role }): 这个装饰器用于定义一个属性，该属性是一个引用Job模型的数组。在数据库中，该属性将被存储为一个包含对Job对象的引用的数组。这种方式在数据库中创建了引用关系，允许你在不同的文档之间建立关联。
 */
