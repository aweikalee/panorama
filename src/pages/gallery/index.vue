<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import Fixed from "@/components/Fixed.vue"
import { getAssets } from "@/utils/oss"
import { useEasyLightbox } from "vue-easy-lightbox"

const list: { name: string; url: string; width?: number; height?: number }[] = [
  {
    name: "平面图",
    url: getAssets("平面图/平面图_1_平面图.png"),
  },
  {
    name: "墙体拆改指示图",
    url: getAssets("平面图/平面图_2_墙体拆改指示图.png"),
  },
  {
    name: "吊顶示意图",
    url: getAssets("平面图/平面图_3_吊顶示意图.png"),
  },
  {
    name: "开关插座布置图",
    url: getAssets("平面图/平面图_4_开关插座布置图.png"),
  },
  {
    name: "灯控图",
    url: getAssets("平面图/平面图_5_灯控图.png"),
  },
  {
    name: "水电立面图1",
    url: getAssets("平面图/平面图_6_水电立面图1.png"),
  },
  {
    name: "水电立面图2",
    url: getAssets("平面图/平面图_7_水电立面图2.png"),
  },
  {
    name: "水电立面图3",
    url: getAssets("平面图/平面图_8_水电立面图3.png"),
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
