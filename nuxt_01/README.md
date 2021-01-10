# Nuxt 开发笔记 - （1）快速入门

本文主要介绍对 Nuxt 的基本使用，其中包含 Nuxt项目的创建、nuxt-i18n 国际化和打包部署。

>   前排提示：
>
>   -   操作系统：Windows 10 
>   -   编辑器：VS code & HBuilder X
>
>   相关推荐：[Nuxt 开发笔记 - （2）视频和图文混合轮播](https://juejin.cn/post/6916107026037522440/)

## 介绍

简介：NuxtJS 让你构建你的下一个 Vue.js 应用程序变得更有信心。这是一个 开源 的框架，让 web 开发变得简单而强大。

官网：[Nuxt 官网（最新版本2.14.8）](https://nuxtjs.org/)，[Nuxt 中文网（最新版本 2.14.5）](https://www.nuxtjs.cn/)（官方文档是最好的资料）

## 安装

详细安装步骤请见：[Nuxt 中文网学习指南](https://www.nuxtjs.cn/guide/installation)（Nuxt 官网没有安装时配置的选择说明，或许是我没找到）。

下面只是我的使用方式，仅供参考。

1.  打开终端

    ```bash
    # 安装
    $ yarn create nuxt-app <项目名称>

    # 一路回车之后（配置均选：默认）

    # 运行
    $ cd <项目名称>
    $ yarn dev

    # 应用现在运行在 http://localhost:3000 上运行
    # 端口冲突情况下会自动修改端口
    ```

2. 安装截图

    ![image-20210107102231582](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb572bc3a8d947dfa0d3a98e05f1d20a~tplv-k3u1fbpfcp-zoom-1.image)

## 国际化

有 [nuxt-i8n](https://i18n.nuxtjs.org/) 和 [vue-i18n](https://kazupon.github.io/vue-i18n/) 可供选择。

我选择 `nuxt-i8n` ，官网文档只有英文的，看不懂可以安装浏览器插件 [沙拉查词](https://saladict.crimx.com/)（内置彩云小译，用了都说好）。

下面只是我的使用方式，仅供参考。

1.  打开终端

    ```bash
    # 安装
    $ yarn add nuxt-i18n
    ```

2.  修改根目录中的 `nuxt.config.js` 文件

    ```javascript
    modules: ["nuxt-i18n"],
    
    i18n: {
      locales: ["en", "zh"],
      defaultLocale: "zh",
      vueI18n: {
        fallbackLocale: "zh",
        messages: {
          zh: {
            lang: "zh",
            switch: "EN",
            links: {
              index: "首页",
              about: "简介",
              news: "新闻"
            }
          },
          en: {
            lang: "en",
            switch: "中",
            links: {
              index: "HOME",
              about: "ABOUT",
              news: "NEWS"
            }
          }
        }
      },
    },
    ```

3.  在 `pages` 文件夹中新建 `about` 和 `blog`  路由对应的页面 

    ```vue
    <template>
      <div>
        <p>随便写点什么</p>
      </div>
    </template>
    
    <script>
      export default {}
    </script>
    
    <style>
    </style>
    ```

4.  在 `components` 文件夹中创建 `Header` 组件

    ```vue
    <template>
      <nav>
        <!-- logo -->
        <nuxt-link :to="localePath('index', $i18n.locale)">
          <Logo />
        </nuxt-link>
        <!-- index -->
        <nuxt-link :to="localePath('index', $i18n.locale)">
          {{ $t("links.index") }}
        </nuxt-link>
        <!-- about -->
        <nuxt-link :to="localePath('about', $i18n.locale)">
          {{ $t("links.about") }}
        </nuxt-link>
        <!-- news -->
        <nuxt-link :to="localePath('news', $i18n.locale)">
          {{ $t("links.news") }}
        </nuxt-link>
        <!-- switch btn -->
        <nuxt-link class="nav-link" v-if="$i18n.locale !== 'zh'" :to="switchLocalePath('zh')">
          {{ $t("switch") }}
        </nuxt-link>
        <nuxt-link class="nav-link" v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
          {{ $t("switch") }}
        </nuxt-link>
      </nav>
    </template>
    
    <script>
      export default {
        name: "Header"
      }
    </script>
    
    <style>
      nav {
        padding: 1rem 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 0.0625rem solid #000000;
      }
    
      nav .NuxtLogo {
        width: 2rem;
        height: 2rem;
      }
    </style>
    ```

5.  在 `layouts` 文件夹中的 `default.vue`  使用 `Header` 组件（并非限定只能在该文件中使用）

    ```vue
    <template>
      <div>
        <Header />
        <Nuxt />
      </div>
    </template>
    
    <script>
      import Header from "@/components/Header"
      export default {
        components: {
          Header
        }
      }
    </script>
    
    <style>
    </style>
    ```

6.  最后看一下效果

    ![image-20210107113954930](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3416df6dc1f041da9066d74b2900e5eb~tplv-k3u1fbpfcp-zoom-1.image)

    ![image-20210107114032576](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a2dc65b23a84fcb9dc1d17930126498~tplv-k3u1fbpfcp-zoom-1.image)

7.  更多配置查看 [nuxt-i8n 官方文档](https://i18n.nuxtjs.org/) 

## 部署

Nuxt 是基于 Node.js  运行的，这里默认服务器已经安装 Node.js。

1.  打包项目

    ```bash
    $ yarn build
    
    # 打包完成后可运行改命令，检查打包后项目运行是否正常
    $ yarn start
    ```

2.  把项目文件的`.nuxt`，`static`，`package.json`，`nuxt.config.js,`这四个文件夹放到服务器项目的根目录中

    ![image-20210107115417754](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c68d33ea71ae49959777d659695f7f11~tplv-k3u1fbpfcp-zoom-1.image)

3.  在安装依赖

    ```bash
    $ yarn install
    
    # 运行
    $ yarn dev
    
    # 应用现在运行在 http://localhost:3000 上运行
    # 端口冲突情况下会自动修改端口
    ```

4.  配置域名实现外部网络访问

    后端的大哥帮我配置在 `Apache` 上了，大多数教程采用 `Nginx`，可以自行搜索。

    你会发现关闭服务器终端后，服务就断了。

5.  PM2 进程守护

    详细请见：[PM2 官网](https://pm2.keymetrics.io/)

    ```bash
    # 安装
    $ yarn global add pm2
    
    # 要在项目目录下启动
    $ cd 项目名称
    ```
    
      	启动
   
     ```bash
     $ pm2 start npm --name "项目名称" -- run build
     ```
    
     成功后的截图

     ![image-20210107121702846](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05954017b5574bf5adc5786ad2f67e93~tplv-k3u1fbpfcp-zoom-1.image)

     常用命令

     ```bash
     $ pm2 list        # 查看进程列表
     $ pm2 show 0      # 查看进程详细信息，0 为 PM2 进程 id 
     $ pm2 stop all    # 停止 PM2 列表中所有的进程
     $ pm2 stop 0      # 停止 PM2 列表中进程为0的进程
     $ pm2 reload all  # 重载 PM2 列表中所有的进程
     $ pm2 reload 0    # 重载 PM2 列表中进程为0的进程
     $ pm2 delete 0    # 删除 PM2 列表中进程为0的进程
     $ pm2 delete all  # 删除 PM2 列表中所有的进程
     ```

     官方还提供可视化监控的工具 [Monitor PM2](https://id.keymetrics.io/api/oauth/register)， 可以自行注册使用

## 源码

GitHub：[Nuxt 开发笔记 - （1）快速入门源码](https://github.com/xjGafi/nuxt_series/tree/master/nuxt_01)

## 源码说明

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```