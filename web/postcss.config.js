// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-pxtorem': process.env.npm_config_page === 'mobile' ? {
      rootValue: 37.5, 
      // 如果是二倍图750px,则rootValue写 75，如果是一倍图375px,则写 37.5
      propList: ['*'],
    } : {},
    tailwindcss: {
      // eslint-disable-next-line no-undef
      config: process.env.npm_config_page === 'mobile' ? './tailwind.config.mobile.js' : './tailwind.config.js'
    },
    autoprefixer: {}
  }
}