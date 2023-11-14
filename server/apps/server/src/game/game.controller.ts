import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { QueryDictDto, MatchBaitDto } from './game.dto';


@Controller('game')
@ApiTags('游戏信息模块')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('maps')
  @ApiOperation({ summary: '获取地图信息' })
  async getMaps() {
    return await this.gameService.getMaps();
  }

  @Get('dicts')
  @ApiOperation({ summary: '获取字典信息' })
  async getDicts(@Query() queryParam: QueryDictDto) {
    return await this.gameService.getDicts(queryParam);
  }

  @Get('matchBait')
  @ApiOperation({ summary: '获取匹配鱼饵' })
  async getMatchBait(@Query() MatchBaitDto: MatchBaitDto) {
    return await this.gameService.getMatchBait(MatchBaitDto);
  }
}
