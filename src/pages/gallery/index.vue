<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import Fixed from "@/components/Fixed.vue"
import { getAssets, getThumbnail } from "@/utils/oss"

const list: { name: string; url: string; width?: number; height?: number }[] = [
  {
    name: "平面图",
    url: getAssets("平面图/平面图_01_平面图.png"),
  },
  {
    name: "原始建筑平面图",
    url: getAssets("平面图/平面图_02_原始建筑平面图.png"),
  },
  {
    name: "砌墙完成面尺寸图",
    url: getAssets("平面图/平面图_03_砌墙完成面尺寸图.png"),
  },
  {
    name: "吊顶示意图",
    url: getAssets("平面图/平面图_04_吊顶示意图.png"),
  },
  {
    name: "开关插座布置图",
    url: getAssets("平面图/平面图_05_开关插座布置图.png"),
  },
  {
    name: "灯控图",
    url: getAssets("平面图/平面图_06_灯控图.png"),
  },
  {
    name: "给水平面图",
    url: getAssets("平面图/平面图_07_给水平面图.png"),
  },
  {
    name: "新风平面图",
    url: getAssets("平面图/平面图_08_新风平面图.png"),
  },
  {
    name: "水电立面图1",
    url: getAssets("平面图/平面图_09_水电立面图1.png"),
  },
  {
    name: "水电立面图2",
    url: getAssets("平面图/平面图_10_水电立面图2.png"),
  },
  {
    name: "水电立面图3",
    url: getAssets("平面图/平面图_11_水电立面图3.png"),
  },
  {
    name: "房门特殊要求",
    url: getAssets("平面图/平面图_12_房门特殊要求.png"),
  },
  {
    name: "地面铺装图",
    url: getAssets("平面图/平面图_13_地面铺装图.png"),
  },
  {
    name: "柜体-主卧衣柜",
    url: getAssets("平面图/平面图_14_柜体-主卧衣柜.png"),
  },
  {
    name: "柜体-次卧衣柜",
    url: getAssets("平面图/平面图_22_柜体-次卧衣柜.png"),
  },
  {
    name: "柜体-客厅",
    url: getAssets("平面图/平面图_15_柜体-客厅.png"),
  },
  {
    name: "柜体-书房阳台",
    url: getAssets("平面图/平面图_16_柜体-书房阳台.png"),
  },
  {
    name: "柜体-橱柜总览",
    url: getAssets("平面图/平面图_17_柜体-橱柜总览.png"),
  },
  {
    name: "柜体-橱柜详情",
    url: getAssets("平面图/平面图_18_柜体-橱柜详情.png"),
  },
  {
    name: "柜体-浴室柜",
    url: getAssets("平面图/平面图_19_柜体-浴室柜.png"),
  },
  {
    name: "柜体-电梯间",
    url: getAssets("平面图/平面图_20_柜体-电梯间.png"),
  },
  {
    name: "柜体-储物间",
    url: getAssets("平面图/平面图_21_柜体-储物间.png"),
  },
]
</script>

<template>
  <div class="gallery">
    <div class="gallery__grid">
      <photo-provider v-for="item in list" :key="item.name">
        <photo-consumer class="gallery__item" :src="item.url" :intro="item.name">
          <div class="gallery__image-wrapper">
            <img class="gallery__thumbnail" :src="getThumbnail(item.url)" :alt="item.name" />
          </div>
          <div class="gallery__name">{{ item.name }}</div>
        </photo-consumer>
      </photo-provider>
    </div>
  </div>

  <Fixed position="bottom">
    <Navbar />
  </Fixed>
</template>

<style scoped lang="scss">
.gallery {
  padding: 20px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    background-color: #08090A;
    border-radius: 8px;
    overflow: hidden;
    color: #fff;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
  }

  &__thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .gallery__item:hover & {
      transform: scale(1.05);
    }
  }

  &__name {
    padding: 12px 8px;
    font-size: 14px;
    text-align: center;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
