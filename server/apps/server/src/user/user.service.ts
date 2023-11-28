import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { Image } from 'libs/db/models/image.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Image) private readonly imageModel,
    @InjectModel(User) private readonly userModel,
  ) {}

  async updateInfo(id, updateInfo) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new ApiException(ErrorEnum.USER_NOT_EXIST);
    }
    if (updateInfo.avatar) {
      const newImage = await this.imageModel.findOne({
        imageUrl: updateInfo.avatar,
      });
      if (newImage) {
        newImage.used = true;
        await newImage.save();
      }
      const oldImage = await this.imageModel.findOne({
        imageUrl: user.avatar,
      });
      if (oldImage) {
        oldImage.used = false;
        await oldImage.save();
      }
    }
    return await this.userModel.findByIdAndUpdate(id, updateInfo, {
      new: true,
    });
  }

  async getUser(id: string) {
    return await this.userModel
      .findById(id)
      .select('nickname avatar description roles')
      .populate({
        path: 'roles',
        select: 'name',
      });
  }
}
