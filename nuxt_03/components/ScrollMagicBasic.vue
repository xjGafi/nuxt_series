<template>
  <div>
    <div :class="`scroll-scene item-${scene.id}`" v-for="scene in sceneData" :key="scene.id">
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
