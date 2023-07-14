import type { AxiosRequestConfig } from 'axios';

// 后端接口返回的数据结构
export interface Response<T = any> {
  code: number | string;
  message: string;
  data: T;
}
// 拓展的axios请求配置
export interface MyAxiosRequestConfig extends AxiosRequestConfig {
  messageComponent?: messageComponent // 消息组件
  handler: {
    unLoginHandler?: () => void; // 未登录处理
  } 
}

export interface messageComponent {
  error: (message: string) => void;
}

export interface refreshTokenRequestQueueItem {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (value: any) => void;
  response: Response;
}

