import { Injectable } from '@nestjs/common';
import { Dict } from 'libs/db/models/dict.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateOrUpdateDictDto } from './dict.dto';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';

@Injectable()
export class DictService {
  constructor(@InjectModel(Dict) private readonly dictModel) {}
  async create(createDictDto: CreateOrUpdateDictDto) {
    const dict = await this.dictModel.findOne({
      dictName: createDictDto.dictName,
      dictValue: createDictDto.dictValue,
      type: createDictDto.type,
    });
    if (dict) {
      throw new ApiException(ErrorEnum.DIST_EXIST);
    }
    return await this.dictModel.create(createDictDto);
  }

  async findAll(pageParam) {
    const { pageSize = 10, pageNum = 1 } = pageParam;
    const dictParam = {
      dictName: {
        $regex: pageParam.dictName || '',
      },
      dictValue: {
        $regex: pageParam.dictValue || '',
      },
      type: {
        $regex: pageParam.type || '',
      },
    };
    const dictList = await this.dictModel
      .find(dictParam)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    // .populate({ path: 'roles', select: ['_id', 'name', 'description'] });
    const total = await this.dictModel.count(dictParam);
    return {
      list: dictList,
      total,
      pageNum: pageParam.pageNum,
      pageSize: pageParam.pageSize,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} menu`;
  }

  update(id: string, updateDictDto: CreateOrUpdateDictDto) {
    return this.dictModel.updateOne({ _id: id }, updateDictDto);
  }

  async remove(id: string) {
    return await this.dictModel.deleteOne({ _id: id });
  }
}
