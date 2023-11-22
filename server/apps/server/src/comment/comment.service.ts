import { Injectable } from '@nestjs/common';
import { CreatePositionCommentDto } from './dto/create-comment.dto';
import { PositionComment } from 'libs/db/models/comment.model';
import { InjectModel } from 'nestjs-typegoose';
import { QueryPositionCommentDto } from './dto/query-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(PositionComment) private readonly positionCommentModel
  ) {}
  async createPositionComment(createCommentDto: CreatePositionCommentDto) {
    const comment = await this.positionCommentModel.create(createCommentDto);
    let parent = null;
    if (createCommentDto.parent) {
      parent = await this.positionCommentModel.findById(createCommentDto.parent);
    }
    if (parent) {
      parent.children.push(comment._id);
      await parent.save();
    }
    return comment
  }

  findPositionComments(query: QueryPositionCommentDto) {
    return this.positionCommentModel
      .find({ position: query.position })
      .populate('user')
      .populate({
        path: 'children',
        populate: {
          path: 'user toUser',
        },

      })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }


  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
