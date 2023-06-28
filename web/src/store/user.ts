import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',{
  state: () => ({
    token: '',
    userInfo: {},
  }),
  persist: true,
  getters: {
    getToken(state): string {
      return state.token;
    },
    getUserInfo(state): any {
      return state.userInfo;
    }
  },
  actions: {
    setToken(token: string): void {
      // 虽然已经配置了persist，这里是为了在axios中方便获取token
      localStorage.setItem('access-token', token);
      this.token = token;
    },
    setUserInfo(userInfo: any): void {
      this.userInfo = userInfo;
    }
  }
});