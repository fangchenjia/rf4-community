import { ApiProperty } from '@nestjs/swagger';

export class registerDto {
  @ApiProperty({ description: '验证码', example: '1234' })
  captcha: string;
  @ApiProperty({ description: '用户名', example: '2362414624' })
  username: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
  @ApiProperty({ description: '昵称', example: '大帅比' })
  nickname: string;
}

export class loginDto {
  @ApiProperty({ description: '验证码', example: '1234' })
  captcha: string;
  @ApiProperty({ description: '用户名', example: '2362414624' })
  username: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}
