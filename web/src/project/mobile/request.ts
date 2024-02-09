import request from '@/utils/request';
import { showLoadingToast, showToast, type ToastWrapperInstance } from 'vant';
import { useRouter } from 'vue-router';

let toast: ToastWrapperInstance | null = null
const requestSetup = () => {
  // 配置自定义axios
  request.reloadConfig({
    baseURL: import.meta.env.VITE_PC_API_BASE_URL,
    handler: {
      unLoginHandler: () => {
        const router = useRouter();
        router.push('/login');
      },
      showLoadingHandler: () => {
        toast = showLoadingToast({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });
      },
      hideLoadingHandler: () => {
        toast?.close();
      }
    },
    messageComponent: {
      error: showToast,
    },
  })
};
export default requestSetup;