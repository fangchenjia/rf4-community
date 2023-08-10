import axios from 'axios';
const ARTICLELIST = '/https://mp.weixin.qq.com/mp/appmsgalbum';
const request = axios.create({
  baseURL: import.meta.env.VITE_PROXY_SERVER,
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
export const getWechatArticleList = (params: ArticleListParams) => {
  // 设置默认值
  params = Object.assign({ action: 'getalbum', count: 10, f: 'json' }, params);
  return request.get(ARTICLELIST, { params });
}