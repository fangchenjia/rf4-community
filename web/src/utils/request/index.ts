import axios, { type AxiosResponse, type AxiosRequestConfig, AxiosError, type AxiosInstance, type InternalAxiosRequestConfig,  } from 'axios';
import { useUserStore } from '@/store/user';
import type { Response, MyAxiosRequestConfig, messageComponent, refreshTokenRequestQueueItem } from './types';
import { ContentTypeEnum } from './enum';
import { getRefreshToken } from '@/api';
import { useAsyncState } from '@vueuse/core'


axios.defaults.timeout = 1000 * 30;
axios.defaults.headers.post['Content-Type'] = ContentTypeEnum.JSON;


export class RequestHttp {
  service: AxiosInstance;
  private refreshTokenFlag: boolean = false;
  private refreshRequestQueue: refreshTokenRequestQueueItem[] = [];
  private messageComponent: messageComponent | undefined;
  private hander: Record<string,any> = {};
  public constructor(config?: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        Object.assign(config.headers, {
          ...config.headers,
          Authorization: `Bearer ${useUserStore().token}`, // store中获取token
        });
        if(config.showLoading) {
          this.hander.showLoadingHandler?.()
        }
        return config;
      },
      (error: AxiosError) => {
        this.messageComponent?.error(error.message);
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    this.service.interceptors.response.use(
      // 2xx时触发
      (response: AxiosResponse) => {
        if(response.config.showLoading) {
          this.hander.hideLoadingHandler?.()
        }
        // response.data就是后端返回的数据
        const { code, message } = response.data;
        if (code !== 200) {
          // 无权限
          if (code === 11002 || code === 401) { // 11002是后端定义的登录过期的错误码
            // 如果未登录
            if (!useUserStore().refreshToken) {
              this.hander.unLoginHandler?.()
              return Promise.reject(response.data);
            }
            // 登录过期 利用refreshToken无感知刷新token
            // 首先把当前的请求加入到队列中 token刷新成功则resolve当前请求 否则reject当前请求
            return new Promise((resolve, reject) => {
              this.refreshRequestQueue.push({
                resolve,
                reject,
                config: response.config,
                response: response.data
              });
              // 如果当前没有在刷新token，那么就刷新token
              if (!this.refreshTokenFlag) {
                this.refresAccessToken();
              }
            });
          } else if (code === 11001) { // 别处登录
            this.hander.unLoginHandler?.();
            useUserStore().clearUser();
          }
          this.messageComponent?.error(message);
          return Promise.reject(response.data);
        }
        return response.data;
      },
      // 非2xx时触发
      (error: AxiosError<Response>) => {
        if(error.config?.showLoading) {
          this.hander.hideLoadingHandler?.()
        }
        const message = error?.message || '请求失败';
        this.messageComponent?.error(message);
        return Promise.reject(error);
      }
    );
  }
  /**
   * @description 清空刷新token的请求队列
   * @param type success表示刷新token成功 error表示刷新token失败
   */
  private clearRefreshRequestQueue(type: 'success' | 'error' = 'success') {
    Array.from({length: this.refreshRequestQueue.length}).forEach(async () => {
      const request = this.refreshRequestQueue.shift();
      if (request) {
        const { config, reject , resolve, response } = request;
        // 成功的话，重新发起请求
        if (type === 'success') {
          resolve(await this.service.request(config));
        } else if(type === 'error') { // 失败的话，直接reject原来的请求
          reject(response)
        }
      }
    });
  }
  /**
   * @description 刷新token
   */
  private async refresAccessToken() {
    this.refreshTokenFlag = true;
    const refreshToken = useUserStore().refreshToken;
    const { state, error} = await useAsyncState(getRefreshToken({ refreshToken }),null);
    if (error.value) {
      useUserStore().clearUser();
      this.hander.unLoginHandler?.();
      this.clearRefreshRequestQueue('error');
    } else {
      useUserStore().setToken(state.value?.data?.accessToken || '');
      this.clearRefreshRequestQueue();
    }
    this.refreshTokenFlag = false;
    
  }
  /**
   * @description 使用该方法配置axios
   * @param config 重新配置axios
   * @param config.messageComponent 消息提示组件 用于显示错误信息
   * @param config.handler 一些处理函数 unLoginHandler 未登录处理函数不同项目处理方式不同 如跳转到登录页 或者弹出登录框
   */
  reloadConfig(config: MyAxiosRequestConfig) {
    this.service.defaults = Object.assign(this.service.defaults, config);
    this.messageComponent = config.messageComponent;
    this.hander = config.handler;
  }
  // * 常用请求方法封装
  get<T>(url: string, params ?: object, config?: AxiosRequestConfig): Promise < Response < T >> {
    return this.service.get(url, { params, ...config })
  }
  post<T>(url: string, params ?: object, config?: AxiosRequestConfig): Promise < Response < T >> {
    return this.service.post(url, params, config)
  }
  put<T>(url: string, params ?: object, config?: AxiosRequestConfig): Promise < Response < T >> {
    return this.service.put(url, params, config)
  }
  delete <T>(url: string, params ?: any, config?: AxiosRequestConfig): Promise < Response < T >> {
    return this.service.delete(url, { params, ...config })
  }
}

export default new RequestHttp();