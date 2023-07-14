import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class registerDto {
  @ApiProperty({ description: '短信验证码', example: '123456' })
  @IsNotEmpty({ message: '短信验证码不能为空' })
  @Length(6, 6, { message: '短信验证码长度为6位' })
  smsCode: string;
  @ApiProperty({ description: '手机号', example: '18711003418' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  mobile: string;
  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  password: string;
}

export class loginDto {
  @ApiProperty({ description: '手机号', example: '18711003418' })
  mobile: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}

export class refreshTokenDto {
  @ApiProperty({ description: 'refreshToken', example: 'sfsafdafadsfas' })
  @IsNotEmpty({ message: 'refreshToken 不能为空' })
  refreshToken: string;
}
