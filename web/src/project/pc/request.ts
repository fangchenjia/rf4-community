import request from '@/utils/request';
import loginModal from '@pc/components/LoginModal'
import { useAppStore } from './stores/app';

const requestSetup = () => {
  // 配置自定义axios
  request.reloadConfig({
    baseURL: import.meta.env.VITE_PC_API_BASE_URL,
    handler: {
      unLoginHandler: () => {
        loginModal.open();
      },
      showLoadingHandler: () => {
        useAppStore().globalLoading = true
      },
      hideLoadingHandler: () => {
        useAppStore().globalLoading = false
      }
    },
    messageComponent: {
      error: window.$message.error,
    },
  })
};
export default requestSetup;