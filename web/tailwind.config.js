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
    extend: {},
  },
  plugins: [],
}

