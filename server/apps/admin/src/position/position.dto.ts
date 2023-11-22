import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from 'shared/dto/page.dto';

export class QueryPositionDto extends PageOptionsDto {
  @ApiProperty({ description: '审批状态', required: false })
  status: string;
}

export class ApprovePositionDto {
  @ApiProperty({ description: '点位id', required: true })
  id: string;

  @ApiProperty({ description: '审批状态', required: true })
  status: string;
}
