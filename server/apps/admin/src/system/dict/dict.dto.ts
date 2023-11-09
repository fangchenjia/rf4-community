import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { PageOptionsDto } from 'shared/dto/page.dto';

export class CreateOrUpdateDictDto {
  @ApiProperty({ description: '字典项名称', example: '' })
  @IsNotEmpty()
  @Length(1, 20)
  dictName: string;

  @ApiProperty({ description: '字典项值', example: '' })
  @IsNotEmpty()
  @Length(1, 60)
  dictValue: string;

  @ApiProperty({ description: '字典项描述', example: '' })
  description: string;

  @ApiProperty({ description: '排序', example: 0 })
  sort: number;

  @ApiProperty({ description: '字典项类型', example: ' ' })
  @IsNotEmpty()
  type: string;
}

export class QueryDictDto extends PageOptionsDto {
  @ApiProperty({ description: '字典项名称', example: '' })
  dictName: string;

  @ApiProperty({ description: '字典项值', example: '' })
  dictValue: string;

  @ApiProperty({ description: '字典项类型', example: ' ' })
  type: string;
}
