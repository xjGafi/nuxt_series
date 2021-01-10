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
