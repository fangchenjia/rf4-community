import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class QueryDictDto {
  @ApiProperty({ description: '字典项类型', example: ' ' })
  @IsNotEmpty()
  type: string;
}

export class MatchBaitDto {
  @ApiProperty({ description: '鱼饵', example: '' })
  @IsNotEmpty()
  @Length(1, 40, { message: '鱼饵长度为1-10位' })
  bait: string;
}
