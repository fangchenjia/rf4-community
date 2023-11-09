/**
 *
 * 仅用于学习交流，不用于商用
 *
 *
 */

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
    const rf4Info = await this.getMapsAndFish();
    const rf4gameInfo = await this.getFishAndBait();
    // 更新鱼种
    for (const item of rf4Info.fish) {
      const fishIcon = rf4gameInfo.fish.find((i) => i.name === item.name)?.icon;
      const fish = await this.fishModel.findOne({ name: item.name });
      if (!fish) {
        await this.fishModel.create({
          name: item.name,
          image: item.image,
          rare: item.rare,
          icon: fishIcon,
          blueWeight: item.blueWeight,
          starWeight: item.starWeight,
        });
      } else {
        fish.image = item.image;
        fish.rare = item.rare;
        fish.icon = fishIcon;
        fish.blueWeight = item.blueWeight;
        fish.starWeight = item.starWeight;
        await fish.save();
      }
    }
    // 更新地图
    for (const item of rf4Info.maps) {
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
    for (const item of rf4gameInfo.baits) {
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

  /**
   * https://rf4.info/cn/ 获取所有地图以及每个地图的鱼种 以及鱼种的稀有度
   */
  async getMapsAndFish() {
    const { data } = await axios.get('https://rf4.info/cn/');
    const $ = cheerio.load(data);
    // 获取所有地图
    const mapOptions = $('#place')
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
    for (const item of mapOptions) {
      console.log(`开始获取地图 ${item.name} 的鱼种...`);
      const { data } = await axios.get(`https://rf4.info/cn/${item.value}`);
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
    // 获取所有鱼种
    const fishOptions = $('#fish')
      .children('option')
      .map((i, el) => {
        return {
          name: $(el).text(),
          value: $(el).attr('value'),
        };
      })
      .filter((i, el) => el.value !== '_')
      .get();
    const fish = [];
    // 获取每个鱼种的稀有度以及达标重量
    for (const item of fishOptions) {
      try {
        console.log(`开始获取鱼种 ${item.name} 的信息...`);
        const { data } = await axios.get(`https://rf4.info/cn/_/${item.value}`);
        const $html = cheerio.load(data);
        const fishItem = {
          name: item.name,
          image: `https://rf4.info/${$html('img.fish_info_img').attr('src')}`,
          rare: '1',
          starWeight: $html('#f_tro').text(),
          blueWeight: $html('#f_str').text(),
        };
        if ($html('#f_rar').toArray().length) {
          fishItem.rare = '2';
        }
        if ($html('#f_sra').toArray().length) {
          fishItem.rare = '3';
        }
        fish.push(fishItem);
      } catch (error) {
        console.log(`获取鱼种 ${item.name} 信息失败`);
      }
    }
    return {
      maps: mapOptions,
      fish,
    };
  }

  /**
   * https://rf4game.com/cn/records/weekly 获取所有鱼种和周榜鱼饵
   */
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
