import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',{
  state: () => ({
    isLogin: false,
    token: '',
    refreshToken: '',
    userInfo: {} as any,
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
      this.token = token;
    },
    setRefreshToken(refreshToken: string): void {
      this.refreshToken = refreshToken;
    },
    setUserInfo(userInfo: any): void {
      this.userInfo = userInfo;
    },
    clearUser(): void {
      this.isLogin = false;
      this.token = '';
      this.refreshToken = '';
      this.userInfo = {};
    }
  }
});