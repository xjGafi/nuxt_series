# Nuxt 开发笔记 - 3 滚动交互动效

本文主要介绍在 Nuxt 中使用 GSAP 和 vue-scrollmagic 插件实现较为复杂的页面滚动交互动效。

>   前排提示：
>
>   -   操作系统：Windows 10
>   -   编辑器：VS Code & HBuilder X
>   -   使用版本：`GSAP: 3.6.0`，`vue-scrollmagic: 1.2.0`
>
>   相关推荐：
>   
>   -   [Nuxt 开发笔记 - 1 快速入门](https://juejin.cn/post/6914871704372117518/)
>   -   [Nuxt 开发笔记 - 2 视频和图文混合轮播 banner](https://juejin.cn/post/6916107026037522440/)

## 预览

CodeSandbox: [Nuxt 开发笔记 - 3 滚动交互动效](https://codesandbox.io/)

## 文档

[GSAP 官网](https://greensock.com/)，[vue-scrollmagic](https://github.com/magr0s/vue-scrollmagic)，[ScrollMagic 官网](http://scrollmagic.io/)

## 安装

### vue-scrollmagic

详细安装步骤请见：[vue-scrollmagic](https://github.com/magr0s/vue-scrollmagic)，

下面只是我的使用方式，仅供参考。

```bash
# 安装 vue-scrollmagic 时会自动安装 ScrollMagic
$ yarn add vue-scrollmagic
```

### GSAP

详细安装步骤请见：[GSAP](https://greensock.com/docs/v3/Installation)

>    特别提示：直接使用 `yarn add gsap` 安装，得到的将是不包含 bonus plugins 的 gasp 版本。在 Nuxt 中将 gasp 搭配 vue-scrollmagic 使用必须安装包含 bonus plugins 的 gasp 版本，这需要注册登录后进行安装。

下面只是我的使用方式，仅供参考。

1.   注册登录后进入 Dashboard 页面，这里提供 GSAP 压缩包 和 Token 两种方式

     ![](../../../../Typora%20Files/Snipaste_2021-02-10_23-01-10.png)

2.   通过 `.npmrc` 文件安装（个人推荐）

     在项目根目录新建 `.npmrc` 文件

     ```
     //npm.greensock.com/:_authToken=<token>
     @gsap:registry=https://npm.greensock.com
     ```

      打开终端

     ```bash
      # <package> 有以下选项 business, shockingly, simply, or member，在官网 Dashboard 页面（上图）的右边栏中有标明，一般默认是 member。
     
      $ yarn add gsap@npm:@gsap/<package>
     ```

3.   通过 `gsap-bonus.tgz` 文件安装

     在下载的压缩包里找到该文件，将其放到项目根目录下

     ![](../../../../Typora%20Files/Snipaste_2021-02-10_22-56-17.png)

     打开终端

     ```bash
     $ yarn add ./gsap-bonus.tgz
     ```

2.   步骤 2、3 选择一种即可，二者安装后的 `package.json` 文件中有一些差异 `"gsap": "npm:@gsap/member" / "gsap": "file:gsap-bonus.tgz"`

## 配置

官方提供了 Demo 请见：[SSR example code](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-awesome-swiper/nuxt)

下面只是我的使用方式，仅供参考。

1.  在 `plugins` 文件夹中新建 `vue-scrollmagic.js` 文件

    ```javascript
    import Vue from "vue";
    import VueScrollmagic from "vue-scrollmagic";

    Vue.use(VueScrollmagic);
    ```


2.  修改根目录中的 `nuxt.config.js` 文件

    ```bash    
    plugins: [
      {
        src: "@/plugins/vue-scrollmagic.js",
        ssr: false
      }
    ],
    ```

## 使用

1.  在 `components` 文件夹中创建 `ScrollMagicBase.vue` 组件

    ```vue
    <template>
      
    </template>
    <script>
      export default {
        name: "ScrollMagicBase",
      };
    </script>
    
    <style>
    </style>
    ```

2.  在 `pages` 文件夹中的 `index.vue` 文件中使用该组件

    ```vue
    <template>
      <div>
      </div>
    </template>
    
    <script>
      import ScrollMagicBase from "@/components/ScrollMagicBase";
    
      export default {
        components: {
          ScrollMagicBase
        },
        data() {
          return {
            },
          }
        }
      }
    </script>
    
    <style>
    </style>
    ```

##  源码

GitHub：[Nuxt 开发笔记 - 3 滚动交互动效](https://github.com/xjGafi/nuxt_series/tree/master/nuxt_03)

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
