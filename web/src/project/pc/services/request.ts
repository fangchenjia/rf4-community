import RequestHttp from '@/utils/request';

const request = new RequestHttp({
  baseURL: import.meta.env.VITE_PC_API_PREFIX,
  // 请求为403时的处理函数
  noPermissionHandler: () => {
    
  },
});

export default request;