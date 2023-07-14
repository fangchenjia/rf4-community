import request from '@/utils/request';
import loginModal from '@pc/components/LoginModal'

const requestSetup = () => {
  // 配置自定义axios
  request.reloadConfig({
    baseURL: import.meta.env.VITE_PC_API_PREFIX,
    handler: {
      unLoginHandler: () => {
        loginModal.open();
      },
    },
    messageComponent: {
      error: window.$message.error,
    },
  })
};
export default requestSetup;