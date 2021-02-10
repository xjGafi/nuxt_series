<template>
  <div>
    <div class="pin-wrap">
      <div class="scroll-wrap">
        <div :class="`scroll-part item-${scene.id}`" v-for="scene in sceneData" :key="scene.id">
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

        tl.to(".scroll-wrap", 1, {
          x: "-12.5%"
        });
        tl.to(".scroll-wrap", 1, {
          x: "-25%"
        });
        tl.to(".scroll-wrap", 1, {
          x: "-37.5%"
        });
        tl.to(".scroll-wrap", 1, {
          x: "-50%"
        });

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
