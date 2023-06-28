import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class registerDto {
  @ApiProperty({ description: '短信验证码', example: '123456' })
  @IsNotEmpty({ message: '短信验证码不能为空' })
  @Length(6, 6, { message: '短信验证码长度为6位' })
  smsCode: string;
  @ApiProperty({ description: '图形验证码', example: '1234' })
  @IsNotEmpty({ message: '图形验证码不能为空' })
  @Length(4, 4, { message: '图形验证码长度为4位' })
  captcha: string;
  @ApiProperty({ description: '手机号', example: '18711003418' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  mobile: string;
  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  password: string;
  @ApiProperty({ description: '昵称', example: '大帅比' })
  @Length(2, 8, { message: '昵称长度为2-8位' })
  @IsNotEmpty({ message: '昵称不能为空' })
  nickname: string;
}

export class loginDto {
  @ApiProperty({ description: '验证码', example: '1234' })
  captcha: string;
  @ApiProperty({ description: '手机号', example: '18711003418' })
  mobile: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}

export class getSmsDto {
  @ApiProperty({ description: '手机号', example: '18711003418' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  mobile: string;
  @ApiProperty({ description: '图形验证码', example: '1234' })
  @IsNotEmpty({ message: '图形验证码不能为空' })
  @Length(4, 4, { message: '图形验证码长度为4位' })
  captcha: string;
}
