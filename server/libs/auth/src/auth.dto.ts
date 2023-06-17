import { ApiProperty } from '@nestjs/swagger';

export class registerDto {
  @ApiProperty({ description: '短信验证码', example: '123456' })
  smsCode: string;
  @ApiProperty({ description: '图形验证码', example: '1234' })
  captcha: string;
  @ApiProperty({ description: '手机号', example: '18711003418' })
  mobile: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
  @ApiProperty({ description: '昵称', example: '大帅比' })
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
  mobile: string;
  @ApiProperty({ description: '图形验证码', example: '1234' })
  captcha: string;
}
