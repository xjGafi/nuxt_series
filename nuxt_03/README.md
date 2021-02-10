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

CodeSandbox: [Nuxt 开发笔记 - 3 滚动交互动效](https://codesandbox.io/s/nuxt03-1h4bf)

>   由于 GSAP 版本的问题，该项目导入 CodeSandbox 中无法直接预览，需要打开后在右下角控制台新建一个 Thermal 并输入 `yarn dev` 命令，最后刷新右上角预览页面。

## 文档

[GSAP 官网](https://greensock.com/)，[vue-scrollmagic](https://github.com/magr0s/vue-scrollmagic)，[ScrollMagic 官网](http://scrollmagic.io/)

## 安装

### vue-scrollmagic

详细安装步骤请见：[vue-scrollmagic](https://github.com/magr0s/vue-scrollmagic)，

下面只是笔者的使用方式，仅供参考。

```bash
# 安装 vue-scrollmagic 时会自动安装 ScrollMagic
$ yarn add vue-scrollmagic
```

### GSAP

详细安装步骤请见：[GSAP](https://greensock.com/docs/v3/Installation)

>    特别提示：直接使用 `yarn add gsap` 安装，得到的将是不包含 bonus plugins 的 gasp 版本。在 Nuxt 中将 gasp 搭配 vue-scrollmagic 使用必须安装包含 bonus plugins 的 gasp 版本，这需要注册登录后进行安装。

下面只是笔者的使用方式，仅供参考。

1.   注册登录后进入 Dashboard 页面，这里提供 GSAP 压缩包 和 Token 两种方式

     ![Dashboard](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/607079c650aa429a91d5de2023943f23~tplv-k3u1fbpfcp-zoom-1.image)

2.   通过 `.npmrc` 文件安装（个人推荐）

     在项目根目录新建 `.npmrc` 文件（笔者在 GitHub 中提供了自用的 `.npmrc` 文件，仅供个人学习使用，切勿他用）

     ```npmrc
     //npm.greensock.com/:_authToken=<token>
     @gsap:registry=https://npm.greensock.com
     ```

      打开终端

     ```bash
      # <package> 有以下选项 business, shockingly, simply, or member
      # 在官网 Dashboard 页面（上图）的右边栏中有标明，一般默认是 member。
     
      $ yarn add gsap@npm:@gsap/<package>
     ```

3.   通过 `gsap-bonus.tgz` 文件安装

     在下载的压缩包里找到该文件，将其放到项目根目录下

     ![gsap-bonus.tgz](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36f22901b3304655afb20fd40338b37b~tplv-k3u1fbpfcp-zoom-1.image)

     打开终端

     ```bash
     $ yarn add ./gsap-bonus.tgz
     ```

2.   步骤 2、3 选择一种即可，二者安装后的 `package.json` 文件中有一些差异 `"gsap": "npm:@gsap/member" / "gsap": "file:gsap-bonus.tgz"`

## 配置

详细配置步骤请见：[vue-scrollmagic](https://github.com/magr0s/vue-scrollmagic)

下面只是笔者的使用方式，仅供参考。

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

>   这里默认你已经会使用 ScrollMagic，否则建议请先前往 [ScrollMagic 官网](http://scrollmagic.io/) 快速入门。

1.  在 `components` 文件夹中创建 `ScrollMagicBasic.vue` 组件

    ```vue
    <template>
      <div>
        <div :class="`scroll-scene item-${scene.id}`"
             v-for="scene in sceneData"
             :key="scene.id">
          <h1>{{ scene.title }}</h1>
        </div>
      </div>
    </template>
    
    <script>
      export default {
        name: "ScrollMagicBasic",
        props: {
          sceneData: {
            type: Array,
            default: () => {
              return [];
            }
          }
        },
        mounted() {
          const that = this;
    
          that.scrollGsap();
        },
        methods: {
          scrollGsap() {
            const that = this;
    
            const slides = document.querySelectorAll(".scroll-scene");
            for (let i = 0; i < slides.length; i++) {
              that.$scrollmagic.addScene(
                that.$scrollmagic
                .scene({
                  triggerElement: slides[i],
                  triggerHook: "onLeave",
                  duration: "100%"
                })
                .setPin(slides[i], {
                  pushFollowers: false
                })
                // .addIndicators()  // 调试
              );
            }
          }
        }
      };
    </script>
    
    <style>
      .scroll-scene {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
    ```

2.  在 `pages` 文件夹中的 `index.vue` 文件中使用该组件

    ```vue
    <template>
      <div>
        <div class="demo">
          <ScrollMagicBasic :sceneData="basicSceneData" />
        </div>
      </div>
    </template>
    
    <script>
      import ScrollMagicBasic from "@/components/ScrollMagicBasic";
    
      export default {
        data() {
          return {
            basicSceneData: [
              {
                id: 0,
                title: "scene item-0",
              },
              {
                id: 1,
                title: "scene item-1",
              },
              {
                id: 2,
                title: "scene item-2",
              },
              {
                id: 3,
                title: "scene item-3",
              }
            ]
          }
        },
        components: {
          ScrollMagicBasic
        }
      }
    </script>
    
    <style>
      .demo {
        position: relative;
        overflow: hidden;
        background-color: white;
      }
    
      .item-0 {
        background-color: teal;
      }
    
      .item-1 {
        background-color: thistle;
      }
    
      .item-2 {
        background-color: tomato;
      }
    
      .item-3 {
        background-color: turquoise;
      }
    </style>
    ```
    
3. 效果预览（仅使用 vue-scrollmagic 实现的简单的滚动效果）

    ![vue-scrollmagic](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74374c3a9822454cbcc9bcd846500adf~tplv-k3u1fbpfcp-zoom-1.image)

4. 在 `components` 文件夹中创建 `ScrollMagicAdvanced.vue` 组件

    ```vue
    <template>
      <div>
        <div class="pin-wrap">
          <div class="scroll-wrap">
            <div :class="`scroll-part item-${scene.id}`"
                 v-for="scene in sceneData"
                 :key="scene.id">
              <h1>{{ scene.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
      export default {
        name: "ScrollMagicAdvanced",
        props: {
          sceneData: {
            type: Array,
            default: () => {
              return [];
            }
          }
        },
        mounted() {
          const that = this;
    
          that.scrollGsap();
        },
        methods: {
          scrollGsap() {
            const that = this;
            var tl = new TimelineMax({
              onUpdate: updatePercentage
            });
    
            tl.to(".scroll-wrap", 1, {x: "-12.5%"});
            tl.to(".scroll-wrap", 1, {x: "-25%"});
            tl.to(".scroll-wrap", 1, {x: "-37.5%"});
            tl.to(".scroll-wrap", 1, {x: "-50%"});
    
            const scene = that.$scrollmagic
              .scene({
                triggerElement: ".pin-wrap",
                triggerHook: "onLeave",
                duration: "400%"
              })
              .setPin(".pin-wrap")
              .setTween(tl);
            // .addIndicators();  // 调试
    
            that.$scrollmagic.addScene(scene);
    
            function updatePercentage() {
              tl.progress();
            }
          }
        }
      };
    </script>
    
    <style>
      .pin-wrap {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        -webkit-perspective: 1000;
        perspective: 1000;
      }
    
      .scroll-wrap {
        width: 200%;
        height: 100vh;
      }
    
      .scroll-part {
        width: 12.5%;
        height: 100vh;
        float: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
    ```

5.  在 `pages` 文件夹中的 `index.vue` 文件中使用该组件

    ```vue
    <template>
      <div>
        <div class="demo">
          <ScrollMagicAdvanced :sceneData="advancedSceneData">
          </ScrollMagicAdvanced>
        </div>
      </div>
    </template>
    
    <script>
      import ScrollMagicAdvanced from "@/components/ScrollMagicAdvanced";
    
      export default {
        data() {
          return {
            advancedSceneData: [{
                id: 0,
                title: "part item-0",
              },
              {
                id: 1,
                title: "part item-1",
              },
              {
                id: 2,
                title: "part item-2",
              },
              {
                id: 3,
                title: "part item-3",
              },
              {
                id: 4,
                title: "part item-4",
              },
              {
                id: 5,
                title: "part item-5",
              },
              {
                id: 6,
                title: "part item-6",
              },
              {
                id: 7,
                title: "part item-7",
              }
            ]
          }
        },
        components: {
          ScrollMagicBasic,
          ScrollMagicAdvanced
        }
      }
    </script>
    
    <style>
      .demo {
        position: relative;
        overflow: hidden;
        background-color: white;
      }
    
      .item-0 {
        background-color: teal;
      }
    
      .item-1 {
        background-color: thistle;
      }
    
      .item-2 {
        background-color: tomato;
      }
    
      .item-3 {
        background-color: turquoise;
      }
    
      .item-4 {
        background-color: violet;
      }
    
      .item-5 {
        background-color: wheat;
      }
    
      .item-6 {
        background-color: yellow;
      }
    
      .item-7 {
        background-color: yellowgreen;
      }
    </style>
    ```

6.  效果预览（vue-scrollmagic 搭配 gsap 实现的复杂的滚动效果）

    ![vue-scrollmagic 搭配 gsap](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96ef8cd4262e4414a284d22515cbb6fb~tplv-k3u1fbpfcp-zoom-1.image)

7.  更多效果请前参见 [ScrollMagic 官网](http://scrollmagic.io/) 提供的官方案例

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
