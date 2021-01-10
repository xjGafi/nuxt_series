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
    opacity: 2;
    width: 3.125rem;
  }
</style>
