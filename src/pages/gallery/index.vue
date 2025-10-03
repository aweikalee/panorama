<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import Fixed from "@/components/Fixed.vue"
import { getAssets } from "@/utils/oss"

const list = [
  {
    name: "平面图",
    url: getAssets("主方案_2025-10-02T06_42_20.7966195Z.jpg"),
  },
  {
    name: "顶面示意图",
    url: getAssets("主方案_2025-10-02T06_42_20.7966195Z.jpg"),
  },
]
</script>

<template>
  <div class="gallery">
    <div class="gallery__item" v-for="item in list" :key="item.name">
      {{ item.name }}
    </div>
  </div>

  <Fixed position="bottom">
    <Navbar />
  </Fixed>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  .gallery__item {
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    color: black;
    text-align: center;
    padding: 10px 20px;
  }
}
</style>
