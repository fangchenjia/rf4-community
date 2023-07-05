import type { AxiosRequestConfig } from 'axios';

// 后端接口返回的数据结构
export interface Response<T = any> {
  code: number | string;
  message: string;
  result: T;
}
// 拓展的axios请求配置
export interface MyAxiosRequestConfig extends AxiosRequestConfig {
  noPermissionHandler?: () => void; // 无权限处理函数 
}

