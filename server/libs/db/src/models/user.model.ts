import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiProperty({ description: '用户名', example: 'user1' })
  username: string;
  @prop()
  @ApiProperty({ description: '密码', example: 'pass1' })
  password: string;
  @prop()
  @ApiProperty({ description: '昵称', example: 'nick1' })
  nickname: string;
  @prop()
  @ApiProperty({ description: '角色', example: 'role1' })
  role: string;
}