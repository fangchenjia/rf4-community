import { Injectable } from '@nestjs/common';
import { Map } from 'libs/db/models/map.model';
import { Dict } from 'libs/db/models/dict.model';
import { Bait } from 'libs/db/models/bait.model';
import { InjectModel } from 'nestjs-typegoose';
import { MatchBaitDto, QueryDictDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Map) private readonly mapModel,
    @InjectModel(Dict) private readonly dictModel,
    @InjectModel(Bait) private readonly baitModel,
  ) {}

  async getMaps() {
    return await this.mapModel.find().populate('fish');
  }

  async getDicts(queryParam: QueryDictDto) {
    return await this.dictModel.find({
      type: queryParam.type,
    });
  }

  async getMatchBait(dto: MatchBaitDto) {
    // 模糊匹配 把数据库和传过来的鱼饵都进行trim然后匹配
    const queryBait = dto.bait.replace(/\s/g, '').toLowerCase();
    const baits = await this.baitModel.find();
    return baits.filter((bait) => {
      return bait.name.replace(/\s/g, '').toLowerCase().includes(queryBait);
    });
  }
}
