import RequestHttp from '@/utils/request';

const BASE_URL = import.meta.env.VITE_PC_API_BASE_URL as string;
const request = new RequestHttp({
  baseURL: '/pc/api'
});

export default request;