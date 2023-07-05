import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

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
  @prop()
  @ApiProperty({ description: '角色', example: 'role1' })
  role: string;
}