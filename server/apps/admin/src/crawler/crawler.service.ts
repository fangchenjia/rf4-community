import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Map as MapModel } from 'libs/db/models/map.model';
import { Fish } from 'libs/db/models/fish.model';
import { Bait } from 'libs/db/models/bait.model';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectModel(MapModel) private readonly mapModel,
    @InjectModel(Fish) private readonly fishModel,
    @InjectModel(Bait) private readonly baitModel,
  ) {}

  async updateMapsAndFish() {
    const maps = await this.getMaps();
    const { fish, baits } = await this.getFishAndBait();
    // 更新鱼种
    for (const item of fish) {
      const fish = await this.fishModel.findOne({ name: item.name });
      if (!fish) {
        await this.fishModel.create({
          name: item.name,
          icon: item.icon,
        });
      }
    }
    // 更新地图
    for (const item of maps) {
      // 地图存在则更新，否则新增
      const map = await this.mapModel.findOne({ name: item.name });
      const fishIds = [];
      for (const i of item.fish) {
        const fish = await this.fishModel.findOne({ name: i.name });
        fishIds.push(fish?._id);
      }
      if (map) {
        map.fish = fishIds;
        await map.save();
      } else {
        await this.mapModel.create({
          name: item.name,
          value: item.value,
          fish: fishIds,
        });
      }
    }
    // 更新鱼饵
    for (const item of baits) {
      const bait = await this.baitModel.findOne({ name: item.name });
      if (bait) {
        if (item.icon) {
          bait.icon = item.icon;
        }
        await bait.save();
      } else {
        await this.baitModel.create({
          name: item.name,
          icon: item.icon,
        });
      }
    }
  }

  async getMaps() {
    // 获取所有地图
    const { data } = await axios.get('https://rf4.info/cn/');
    const $ = cheerio.load(data);
    const res = $('#place')
      .children('option')
      .map((i, el) => {
        return {
          name: $(el).text(),
          value: $(el).attr('value'),
          fish: [],
        };
      })
      .filter((i, el) => el.value !== '_')
      .get();
    // 获取每个地图的鱼种
    for (const item of res) {
      console.log(`开始获取地图 ${item.name} 的鱼种...`);
      const { data } = await axios.get(`https://rf4.info/cn/${item.value}`);
      console.log(`获取地图 ${item.name} 的鱼种完成`);
      const $html = cheerio.load(data);
      const mapFish = $html('#fish')
        .children('option')
        .map((i, el) => {
          return {
            name: $(el).text(),
            value: $(el).attr('value'),
          };
        })
        .filter((i, el) => el.value !== '_')
        .get();
      item.fish = mapFish;
    }
    return res;
  }

  async getFishAndBait() {
    console.log('开始获取周榜鱼种和鱼饵...');
    const { data } = await axios.get('https://rf4game.com/cn/records/weekly');
    console.log('获取周榜鱼种和鱼饵完成');
    const $ = cheerio.load(data);
    const baits = new Map();
    console.log('开始解析...');
    const res = $('div.records_subtable')
      .toArray()
      .map((item) => {
        // 获取鱼图标
        const itemIcon = $(item)
          .find('div.item_icon')
          .attr('style')
          .match(/url\(['"]?(.*?)['"]?\)/)?.[1]
          ?.replace(/^\/\//, 'https://');
        // 获取鱼名称
        const fishName = $(item).find('div.text').text();
        // 周榜
        const fishRecord = $(item)
          .find('div.row')
          .toArray()
          .map((record) => {
            const $record = $(record);
            // 周榜重量
            const recordWeight = $record.find('div.weight').text();
            // 周榜地图
            const recordLocation = $record.find('div.location').text();
            // 玩家名
            const recordGamername = $record.find('div.gamername').text();
            // 周榜时间
            const recordDate = $record.find('div.data').text();
            // 周榜鱼饵
            const recordBait = $record.find('div.bait_icon').attr('title');
            // 周榜鱼饵图标
            const recordBaitIcon = $record
              .find('div.bait_icon')
              .attr('style')
              ?.match(/url\(['"]?(.*?)['"]?\)/)?.[1]
              ?.replace(/^\/\//, 'https://');
            // 记录鱼饵
            // 河鳌虾 14; 螃蟹和贻贝 Soluble 15 这种应该单独记录
            if (recordBait) {
              if (recordBait.includes(';')) {
                recordBait.split(';').map((name, index) => {
                  baits.set(name.trim(), index === 0 ? recordBaitIcon : null);
                });
              } else {
                baits.set(recordBait.trim(), recordBaitIcon);
              }
            }
            return {
              weight: recordWeight,
              location: recordLocation,
              gamername: recordGamername,
              date: recordDate,
              bait: recordBait,
              baitIcon: recordBaitIcon,
            };
          });
        return {
          icon: itemIcon,
          name: fishName,
          record: fishRecord,
        };
      });
    const baitList = Array.from(baits.keys()).map((key) => {
      return {
        name: key,
        icon: baits.get(key),
      };
    });
    console.log('解析完成');
    return {
      fish: res,
      baits: baitList,
    };
  }

  async getVk() {
    const { data } = await axios.get('https://vk.com/rf4chinaspot');
    const $ = cheerio.load(data);
    const res = $('img').toArray();
    console.log(res);
    return res;
  }
}
