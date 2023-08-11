import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from 'libs/cache';
import { ArticlleAlbums } from './wechatArticleConfig';
import axios from 'axios';

@Injectable()
export class TasksService {
  constructor(private redisCacheService: RedisCacheService) {}

  // 每天八点到九点每二十分钟执行一次
  @Cron('0 */20 8-9 * * *')
  async handleCron() {
    await this.captureWechatArticleList();
  }
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
            // 如果数组不为空，遍历数组，如果当前文章的发布时间大于数组中的文章发布时间，插入到数组中
            for (let i = 0; i < todayArticle[album.__biz].length; i++) {
              if (
                article.create_time > todayArticle[album.__biz][i].create_time
              ) {
                todayArticle[album.__biz].splice(i, 0, article);
                break;
              }
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
}
