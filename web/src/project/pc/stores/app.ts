import { darkThemeOverrides, lightThemeOverrides } from './../theme/themeOverrides';
import { defineStore } from 'pinia'



export const useAppStore = defineStore('app',{
  persist: true,
  state: () => ({
    theme: 'light',
    globalLoading: false
  }),
  getters: {
    themeOverrides(state): any {
      return state.theme === 'light' ? lightThemeOverrides : darkThemeOverrides;
    }
  },
  actions: {
    /**
     * 设置主题
     * @param theme - 可选值 ('dark' or 'light').
     */
    setTheme(theme: string): void {
      // Set the theme
      this.theme = theme;
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    /**
     * 切换主题
     *  
     */
    toggleTheme(): void {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
  }
})
