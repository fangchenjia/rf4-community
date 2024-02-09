/** @type {import('tailwindcss').Config} */
module.exports = {
  // 禁用预加载，修复tailwind样式 与 button等样式等冲突问题
  corePlugins:{
    preflight: false
  }, 
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      'xs': '.25rem',
      'sm': '.3rem',
      'tiny': '.375rem',
      'base': '.45rem',
      'lg': '.75rem',
      'xl': '1rem',
      '2xl': '1.25rem',
    },
    extend: {
    }
  },
  plugins: [],
}

