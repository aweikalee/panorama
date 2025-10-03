<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import Fixed from "@/components/Fixed.vue"
import { getAssets } from "@/utils/oss"
import { useEasyLightbox } from "vue-easy-lightbox"

const list: { name: string; url: string; width?: number; height?: number }[] = [
  {
    name: "平面图",
    url: getAssets("主方案_2025-10-02T06_42_20.7966195Z.jpg"),
  },
  {
    name: "顶面示意图",
    url: getAssets("主方案_2025-10-02T06_51_22.0568531Z.jpg"),
  },
]

const { imgsRef, indexRef, onHide, visibleRef } = useEasyLightbox()
</script>

<template>
  <div class="gallery">
    <a
      class="gallery__item"
      v-for="item in list"
      :key="item.name"
      target="_blank"
      @click="
        () => {
          visibleRef = true
          indexRef = list.indexOf(item)
          imgsRef = list.map((item) => item.url)
        }
      "
    >
      {{ item.name }}
    </a>
  </div>

  <Fixed position="bottom">
    <Navbar />
  </Fixed>

  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    @hide="onHide"
    :zoomScale="1"
    style="background: rgba(0, 0, 0, 0.8)"
  >
    <template #prev-btn> </template>
    <template #next-btn> </template>
    <template #toolbar> </template
  ></vue-easy-lightbox>
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
