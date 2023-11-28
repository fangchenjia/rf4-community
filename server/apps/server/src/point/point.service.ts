import { Injectable } from '@nestjs/common';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ArticlleAlbums } from './wechatArticleConfig';
import { Position } from 'libs/db/models/position.model';
import { Image } from 'libs/db/models/image.model';
import axios from 'axios';
import { RedisCacheService } from 'libs/cache';
import { InjectModel } from 'nestjs-typegoose';
import { QueryPointsDto, SubmitPointDto } from './point.dto';

@Injectable()
export class PointService {
  constructor(
    private redisCacheService: RedisCacheService, // 缓存
    @InjectModel(Position) private readonly positionModel,
    @InjectModel(Image) private readonly imageModel,
  ) {
    // 启动时缓存微信公众号文章
    this.captureWechatArticleList();
  }
  // 获取微信公众号最新文章
  async getWechatArticleList() {
    return (await this.redisCacheService.cacheGet('wechatArticleList')) || [];
  }
  // 获取微信公众号文章详情
  // 微信公众号文章缓存
  async captureWechatArticleList() {
    // 根据__biz 和 album_id 获取所有分类文章，并且选择所有分类的当天最新文章
    const todayArticle = {};
    for (const album of ArticlleAlbums) {
      todayArticle[album.__biz] = [];
      // 把所有分类时间最新的文章推入数组，取前10条
      for (const albumId of album.albumIds) {
        const params = {
          __biz: album.__biz,
          album_id: albumId,
          action: 'getalbum',
          count: 4,
          f: 'json',
        };
        const res = await axios.get('https://mp.weixin.qq.com/mp/appmsgalbum', {
          params,
        });
        // 如果只有一个数据，返回的是对象，需要转成数组
        if (res.data?.getalbum_resp?.article_list?.length === undefined) {
          res.data.getalbum_resp.article_list = [
            res.data.getalbum_resp.article_list,
          ];
        }
        // 遍历所有文章，如果并且和数组中的文章发布时间做比较，做冒泡排序
        const articleList = res.data.getalbum_resp.article_list;
        for (const article of articleList) {
          // 如果数组为空，直接推入
          if (todayArticle[album.__biz].length === 0) {
            todayArticle[album.__biz].push(article);
          } else {
            // 如果数组不为空，遍历数组，如果当前文章的发布时间大于数组中的文章发布时间，插入到数组对应位置，否则直接推入
            let flag = false;
            for (let i = 0; i < todayArticle[album.__biz].length; i++) {
              if (
                article.create_time > todayArticle[album.__biz][i].create_time
              ) {
                todayArticle[album.__biz].splice(i, 0, article);
                flag = true;
                break;
              }
            }
            if (!flag) {
              todayArticle[album.__biz].push(article);
            }
          }
        }
        // 取前6条
        todayArticle[album.__biz] = todayArticle[album.__biz].slice(0, 6);
      }
    }
    // 缓存到redis 一天
    await this.redisCacheService.cacheSet(
      'wechatArticleList',
      todayArticle,
      60 * 60 * 24,
    );
  }

  // 投稿
  async submitPoint(user, body: SubmitPointDto) {
    const userId = user.id;
    const position = {
      author: userId,
      ...body,
      status: 'pendingReview',
    };
    const res = await this.positionModel.create(position);
    // 记录保存的图片
    if (body.fishImages.length > 0 || body.equipmentImages.length > 0) {
      const imgs = [...body.fishImages, ...body.equipmentImages];
      for (const image of imgs) {
        await this.imageModel.updateOne(
          { imageUrl: image },
          { $set: { used: true } },
        );
      }
    }
    return {
      title: res.title,
      id: res._id,
    };
  }

  // 最新点位
  async getLatestPoints() {
    const positions = await this.positionModel
      .find({ status: 'approved' })
      .select(
        'title author views likes createdAt description fishImages equipmentImages tags map fish position',
      )
      .populate({
        path: 'author',
        select: 'avatar nickname roles',
        populate: {
          path: 'roles',
          select: 'name',
        },
      })
      .populate({
        path: 'map',
        select: 'name',
      })
      .populate({
        path: 'fish',
        select: 'name image',
      })
      .sort({ createdAt: -1 })
      .limit(6);
    return positions;
  }

  async getPoints(query: QueryPointsDto) {
    const queryparm = {
      map: query.map,
      status: 'approved',
    };
    if (query.fish) {
      queryparm['fish'] = {
        $in: query.fish,
      };
    }
    const positions = await this.positionModel
      .find(queryparm)
      .select(
        'title author views likes createdAt description fishImages equipmentImages tags map fish position',
      )
      .populate({
        path: 'author',
        select: 'avatar nickname roles',
        populate: {
          path: 'roles',
          select: 'name',
        },
      })
      .populate({
        path: 'map',
        select: 'name',
      })
      .populate({
        path: 'fish',
        select: 'name image',
      })
      .sort({ createdAt: -1 })
      .limit(30);
    return positions;
  }
  // 点赞
  async likePoint(useId: string, positionId: string) {
    const position = await this.positionModel.findById(positionId);
    if (!position.likes.includes(useId)) {
      position.likes.push(useId);
      await position.save();
    } else {
      position.likes.splice(position.likes.indexOf(useId), 1);
      await position.save();
    }
    return position.likes;
  }

  // 点位详情
  async getPointDetail(id: string) {
    const position = await this.positionModel
      .findOne({ _id: id })
      .populate({
        path: 'author',
        select: 'avatar nickname roles',
        populate: {
          path: 'roles',
          select: 'name',
        },
      })
      .populate({
        path: 'map',
        select: 'name',
      })
      .populate({
        path: 'fish',
        select: 'name image',
      })
      .populate('fishingTackle', 'dictName')
      .populate('fishingGroup', 'dictName');
    // 记录浏览数
    position.views++;
    await position.save();
    return position;
  }

  // 获取用户点位
  async userPoints(id: string) {
    const positions = await this.positionModel
      .find({ author: id })
      .select(
        'title author views likes createdAt description fishImages equipmentImages tags map fish position',
      )
      .populate({
        path: 'author',
        select: 'avatar nickname roles',
        populate: {
          path: 'roles',
          select: 'name',
        },
      })
      .populate({
        path: 'map',
        select: 'name',
      })
      .populate({
        path: 'fish',
        select: 'name image',
      })
      .sort({ createdAt: -1 });

    return positions;
  }

  // 排行榜
  async userRank() {
    const userList = await this.positionModel.aggregate([
      {
        $group: {
          _id: '$author',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user', // 确保我们得到每个用户的详细信息而不是一个包含用户信息的数组。
      },
      {
        $project: {
          _id: 0,
          count: 1,
          'user.avatar': 1,
          'user.nickname': 1,
          'user.roles': 1,
          'user._id': 1,
          'user.mobile': 1,
          'user.description': 1,
        },
      },
    ]);
    return userList;
  }
}
