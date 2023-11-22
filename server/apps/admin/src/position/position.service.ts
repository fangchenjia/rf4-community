import { Length } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Position } from 'libs/db/models/position.model';
import { Image } from 'libs/db/models/image.model';
import { ApprovePositionDto, QueryPositionDto } from './position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position) private readonly positionModel,
    @InjectModel(Image) private readonly imageModel,
  ) {}

  async findAll(queryParam: QueryPositionDto) {
    const { pageSize = 10, pageNum = 1 } = queryParam;

    const query = {};
    if (queryParam.status) {
      query['status'] = queryParam.status;
    }
    const total = await this.positionModel.countDocuments(query);
    const list = await this.positionModel
      .find(query)
      .populate('author')
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return {
      list: list,
      total,
      pageNum: pageNum,
      pageSize: pageSize,
    };
  }

  async approve(body: ApprovePositionDto) {
    const { id, status } = body;
    const position = await this.positionModel.findById(id);
    position.status = status;
    await position.save();
    return position;
  }

  async remove(id: string) {
    // 删除图片
    const position = await this.positionModel.findById(id);
    if (position.equipmentImages.length || position.fishImages.length) {
      const imgs = [...position.equipmentImages, ...position.fishImages];
      for (const image of imgs) {
        // 设置图片为未使用
        await this.imageModel.updateOne(
          { imageUrl: image },
          { $set: { used: false } },
        );
      }
    }
    return await this.positionModel.findByIdAndDelete(id);
  }
}
