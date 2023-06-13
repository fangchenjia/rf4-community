# rf4-community
vue3+ts+nest.js全栈项目--俄罗斯钓鱼4社区网站

# 服务端
> 服务端使用nest.js框架，使用monorepo模式，分为admin、server两个子项目，admin为后台管理端接口，server为web端接口

## 环境配置

> 首先请在`server`目录下创建`.env.dev`文件和`.env.prod`文件，分别为开发环境和生产环境的环境变量配置文件，内容可参考`.env.example`文件

## 启动服务端
```bash
cd server
# 安装依赖
npm install
# 运行
# 运行admin服务端
npm run start:dev admin # 测试环境
npm run start:prod:admin # 生产环境
# 运行web服务端
npm run start:dev server # 测试环境
npm run start:prod:server # 生产环境
```
## 接口文档

> 服务端接口文档使用swagger生成
> admin访问地址为`http://localhost:{process.env.ADMIN_PORT}/api-docs`
> server访问地址为`http://localhost:{process.env.SERVER_PORT}/api-docs`

