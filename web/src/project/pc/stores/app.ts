import { darkThemeOverrides, lightThemeOverrides } from './../theme/themeOverrides';
import { defineStore } from 'pinia'



export const useAppStore = defineStore('app',{
  persist: true,
  state: () => ({
    theme: 'light'
  }),
  getters: {
    themeOverrides(state): any {
      return state.theme === 'light' ? lightThemeOverrides : darkThemeOverrides;
    }
  },
  actions: {
    setTheme(theme: string): void {
      this.theme = theme;
    }
  }
})
