<template>
  <div>
    <!--    <div class="demo">
      <h1>vue-scrollmagic 简单 demo</h1>
      <ScrollMagicBasic :sceneData="basicSceneData" />
    </div> -->
    <div class="demo">
      <!-- <h1>vue-scrollmagic 结合 gsap 复杂 demo</h1> -->
      <ScrollMagicAdvanced :sceneData="advancedSceneData">
      </ScrollMagicAdvanced>
    </div>
  </div>
</template>

<script>
  import ScrollMagicBasic from "@/components/ScrollMagicBasic";
  import ScrollMagicAdvanced from "@/components/ScrollMagicAdvanced";

  export default {
    data() {
      return {
        basicSceneData: [{
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
        ],
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
