import { Injectable } from '@nestjs/common';
import { CreatePositionCommentDto } from './dto/create-comment.dto';
import { PositionComment } from 'libs/db/models/comment.model';
import { InjectModel } from 'nestjs-typegoose';
import { QueryPositionCommentDto } from './dto/query-comment.dto';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(PositionComment) private readonly positionCommentModel,
  ) {}
  async createPositionComment(createCommentDto: CreatePositionCommentDto) {
    const comment = await this.positionCommentModel.create(createCommentDto);
    let parent = null;
    if (createCommentDto.parent) {
      parent = await this.positionCommentModel.findById(
        createCommentDto.parent,
      );
    }
    if (parent) {
      parent.children.push(comment._id);
      await parent.save();
    }
    return comment;
  }

  findPositionComments(query: QueryPositionCommentDto) {
    return this.positionCommentModel
      .find({ position: query.position })
      .populate({
        path: 'user toUser',
        populate: {
          path: 'roles',
        },
      })
      .populate({
        path: 'children',
        populate: {
          path: 'user toUser',
          populate: {
            path: 'roles',
          },
        },
      })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async removePositionComment(id: string, userId: string) {
    const comment = await this.positionCommentModel.findById(id);
    // 判断权限
    if (comment.user.toString() !== userId) {
      throw new ApiException(ErrorEnum.NO_PERMISSION);
    }
    if (comment) {
      // 删除父评论的引用
      const parent = await this.positionCommentModel.findById(comment.parent);
      if (parent) {
        parent.children = parent.children.filter(
          (item) => item.toString() !== id,
        );
        await parent.save();
      }
      // 删除子评论
      await this.positionCommentModel.deleteMany({
        _id: { $in: comment.children },
      });
    } else {
      throw new ApiException(ErrorEnum.COMMENT_NOT_EXIST);
    }
    const res = await this.positionCommentModel.findByIdAndRemove(id);
    return res;
  }

  async likePositionComment(id: string, userId: string) {
    const comment = await this.positionCommentModel.findById(id);
    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await comment.save();
    } else {
      comment.likes.splice(comment.likes.indexOf(userId), 1);
      await comment.save();
    }
    return comment;
  }
}
