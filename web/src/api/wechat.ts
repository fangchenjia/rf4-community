import axios from 'axios';
import request from '@/utils/request';

export const ARTICLELISTLATEST = '/v1/point/wechatArticleList'
const ARTICLELIST = '/https://mp.weixin.qq.com/mp/appmsgalbum';




// 获取地图的文章可以直接通过请求微信公众号的接口获取  但拿不到每日的最新文章 需要把所有分类的文章都请求一遍，然后做比较，取最新的 这里后台做了缓存，每天0点执行一次

const corsRequest = axios.create({
  baseURL: import.meta.env.VITE_PROXY_SERVER,
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // 设置该请求为ajax请求
  }
});
// 根据__biz获取公众号最新文章
type ArticleListParams = {
  __biz: string // 公众号id
  action?: string // getalbum
  album_id: string 
  begin?: number
  count?: number 
  f?: string
}
// 前端直接获取每个地图的最新文章
export const getWechatArticleList = (params: ArticleListParams) => {
  // 设置默认值
  params = Object.assign({ action: 'getalbum', count: 10, f: 'json' }, params);
  return corsRequest.get(ARTICLELIST, { params });
}
// 获取每日最新文章
export const wechatArticleListLatest = () => {
  return request.get(ARTICLELISTLATEST)
}