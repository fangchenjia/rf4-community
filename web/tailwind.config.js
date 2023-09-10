/** @type {import('tailwindcss').Config} */
module.exports = {
  // 禁用预加载，修复tailwind样式 与 naive-ui button等样式等冲突问题
  corePlugins:{
    preflight: false
  }, 
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // 底部shadow 白色和黑色
      dropShadow: {
        'dark': '0 0 10px rgba(255, 255, 255, 0.2)',
        'light': '0 0 10px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  darkMode: ['class'],
  plugins: [],
}

