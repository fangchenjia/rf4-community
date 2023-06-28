import axios, { type AxiosResponse, type InternalAxiosRequestConfig, type AxiosRequestConfig, AxiosError, type AxiosInstance,  } from 'axios';
import { useUserStore } from '@/store/user';
import type { Response } from './types';
import { ContentTypeEnum } from './enum';

axios.defaults.timeout = 1000 * 30;
axios.defaults.headers.post['Content-Type'] = ContentTypeEnum.JSON;

// 需要在main.ts中在window上挂载$message
const $message = window.$message;

const userStore = useUserStore();

export class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        Object.assign(config.headers, {
          ...config.headers,
          Authorization: userStore.token, // store中获取token
        });
        return config;
      },
      (error: AxiosError) => {
        $message?.error(error.message);
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    this.service.interceptors.response.use(
      // 2xx时触发
      (response: AxiosResponse) => {
        // response.data就是后端返回的数据
        const { code, message } = response.data;
        let errMessage = '';
        switch (code) {
          case 2000:
            break;
          case 4003: // token过期
            errMessage = '登录过期';
            window.location.hash == '#/login';
            break;
          default:
            errMessage = message;
            break;
        }
        if (errMessage) {
          $message?.error(errMessage);
        }
        return response.data;
      },
      // 非2xx时触发
      (error: AxiosError<Response>) => {
        const message = error?.response?.data?.message || error.message;
        const code = error?.response?.data?.code;
        if (code === 403) {
          window.location.hash = '#/login';
        }
        $message?.error(message);
        return Promise.reject(error);
      }
    );
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

export default RequestHttp;