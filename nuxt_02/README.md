# Nuxt 开发笔记 - （2）视频和图文混合轮播

本文主要介绍在 Nuxt 中使用 vue-awesome-swiper 和 Swiper 插件实现视频和图文混合轮播效果。

>   前排提示：
>
>   -   操作系统：Windows 10 
>   -   编辑器：VS code & HBuilder X
>   -   官网文档：[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)，[Swiper](https://swiperjs.com/)（官方文档是最好的资料）
>   -   使用版本：`vue-awesome-swiper: 4.1.1`，`Swiper: 4.5.1`
>
>   相关推荐：[Nuxt 开发笔记 - （1）快速入门](https://juejin.cn/post/6914871704372117518/)

## 安装

详细安装步骤请见：[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)

官方推荐 `Swiper` 安装版本 `5.x` 版本，但是我在 Nuxt 中用使用一直抛错，最后选择了 `4.5.1` 版本。

下面只是我的使用方式，仅供参考。

```bash
# 安装
yarn add swiper@4.5.1 vue-awesome-swiper
```

## 配置

官方提供了 Demo 请见：[SSR example code](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-awesome-swiper/nuxt)

下面只是我的使用方式，仅供参考。

1.  在 `plugins` 文件夹中新建 `vue-awesome-swiper.js` 文件

    ```javascript
    import Vue from "vue";
    import VueAwesomeSwiper from "vue-awesome-swiper";
    
    Vue.use(VueAwesomeSwiper);
    ```

2.  修改根目录中的 `nuxt.config.js` 文件

    提示：注意 `css` 的配置，你所使用的 `Swiper` 版本不同需要引用对应的文件，否则会抛出类似的错误 `swiper/css/swiper.css not found`

    ```bash
    css: [
      // import style (>= Swiper 6.x)
      // 'swiper/swiper-bundle.css',
      // import style (<= Swiper 5.x)
      "swiper/dist/css/swiper.css" 
    ],
    
    plugins: [
      {
        src: "@/plugins/vue-awesome-swiper.js",
        ssr: false
      }
    ],
    ```

## 使用

1.  在 `components` 文件夹中创建 `Swiper` 组件

    ```vue
    <template>
      <div v-swiper="swiper_option">
        <div class="swiper-wrapper">
          <!-- video -->
          <div ref="video_slide" class="swiper-slide">
            <div class="video_wrap">
              <video ref="video" :src="swiper_video.src" :poster="swiper_video.poster" muted autoplay @ended="isEnded"
                @playing="isPlaying">
                <source :src="swiper_video.src" type="video/mp4" />
              </video>
            </div>
          </div>
          <!-- image -->
          <div v-for="swiper in swiper_image" :key="swiper.id" class="swiper-slide">
            <div class="image image_zoom" :style="`background-image:url( ${swiper.img} )`"></div>
          </div>
        </div>
        <div slot="pagination" class="swiper-pagination"></div>
      </div>
    </template>
    <script>
      export default {
        name: "Swiper",
        props: {
          swiper_video: {
            type: Object,
            default: () => {
              return {}
            }
          },
          swiper_image: {
            type: Array,
            default: () => {
              return []
            }
          },
          swiper_option: {
            type: Object,
            default: () => {
              return {
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true
                },
                autoplay: {
                  delay: 5000,
                  stopOnLastSlide: false, // 播放到最后一张是否停止
                  disableOnInteraction: false // 手动滑动是否停止自动播放
                },
                observer: true,
                observeParents: true,
                fadeEffect: {
                  crossFade: true
                },
                effect: "fade",
              }
            }
          },
        },
        data() {
          return {};
        },
        created() {
          const that = this;
          that.swiper_option.on = {
            transitionEnd: function() {
              // 切换下一屏时，运行的代码
              // 判断当前轮播屏是否为视频
              if (that.$refs.video_slide.className.includes("swiper-slide-active")) {
                that.$swiper.autoplay.stop(); // 停止轮播图轮播
                that.$refs.video.play(); // 播放视频
              }
            }
          };
          // console.log("that.swiper_option: ", that.swiper_option);
        },
        methods: {
          isEnded() {
            const that = this;
            if (that.$swiper.isEnd) {
              // 判断是否为最后一个
              that.$swiper.slideTo(0); // 如果是最后一个直接跳到第一个
            } else {
              // 非最后一个的话正常执行
              that.$swiper.autoplay.start(); // 轮播图开始自动播放
              that.$swiper.slideNext(); // 播放完视频，立即切换下一个
              that.$swiper.autoplay.delay = 5000; // 轮播图自动播放时秒数为5秒
              that.$refs.video.currentTime = 0; // 视频时间复位
              that.$refs.video.pause(); // 背景视频停止播放
            }
          },
          // 视频开始播放监听事件
          isPlaying() {
            const that = this;
            // 判断当前轮播屏是否为视频
            if (that.$refs.video_slide.className.includes("swiper-slide-active")) {
              that.$swiper.autoplay.stop(); // 停止轮播图轮播
            }
          }
        }
      };
    </script>
    
    <style>
      :root {
        --blue: #007bff;
        --light: #ffffff;
      }
    
      .swiper-wrapper {
        height: 100vh;
      }
    
      .video_wrap video {
        width: 100vw;
      }
    
      .image {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--blue);
        background-size: cover;
        background-position: center;
        background-image: none;
        background-repeat: no-repeat;
      }
    
      .swiper-slide-active .image_zoom {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
        -webkit-transition: all 10s;
        -moz-transition: all 10s;
        transition: all 10s;
        -webkit-transition-delay: 0s;
        -moz-transition-delay: 0s;
        transition-delay: 0s;
      }
    
      .pagination {
        position: absolute;
        left: 0;
        text-align: center;
        bottom: 0.3125rem;
        width: 100%;
        z-index: 100;
      }
    
      .swiper-pagination-bullet {
        display: inline-block;
        width: 0.625rem;
        height: 0.375rem;
        opacity: 0.7;
        border-radius: 0.1875rem;
        background: var(--light);
        margin: 0 0.1875rem;
        cursor: pointer;
        -webkit-transition: width 0.3s ease-in-out;
        -moz-transition: width 0.3s ease-in-out;
        transition: width 0.3s ease-in-out;
      }
    
      .swiper-pagination-bullet-active {
        background: var(--blue);
        opacity: 1;
        width: 3.125rem;
      }
    </style>
    ```

2.  在 `pages` 文件夹中的 `index.vue` 文件中使用该组件

    提示：这里的视频和图片均采用网络资源。

    ```vue
    <template>
      <div>
        <Swiper :swiper_video="swiper_data.swiper_video" :swiper_image="swiper_data.swiper_image"></Swiper>
      </div>
    </template>
    
    <script>
      import Swiper from "@/components/Swiper";
    
      export default {
        components: {
          Swiper
        },
        data() {
          return {
            swiper_data: {
              swiper_video: {
                src: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
                poster: ""
              },
              swiper_image: [
                {
                  id: 0,
                  img: "https://picsum.photos/id/1/1920/1080"
                },
                {
                  id: 1,
                  img: "https://picsum.photos/id/10/1920/1080"
                },
                {
                  id: 3,
                  img: "https://picsum.photos/id/100/1920/1080"
                }
              ],
            },
          }
        }
      }
    </script>
    
    <style>
    </style>
    ```

## 源码

Github：[《Nuxt 开发笔记 - （2）视频和图文混合轮播》源码](https://github.com/xjGafi/nuxt_series/tree/master/nuxt_02)

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