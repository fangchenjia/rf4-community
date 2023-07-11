import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

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
