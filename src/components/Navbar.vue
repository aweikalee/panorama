<script setup lang="ts">
import { sceneOptions } from "@/config"
import { useRoute } from "vue-router"

const route = useRoute()

const navs = [
  ...sceneOptions.map((o) => ({
    name: o.title,
    path: `/panorama/${o.name}`,
  })),

  {
    name: "平面图",
    path: "/gallery",
  },
]
</script>

<template>
  <div class="navbar">
    <router-link
      v-for="nav in navs"
      :key="nav.path"
      class="navbar__item"
      :class="{
        active: route.path === nav.path,
      }"
      :to="nav.path"
    >
      {{ nav.name }}
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px;
  background: #08090a;
  color: white;

  .navbar__item {
    appearance: none;
    padding: 4px 20px;
    background-color: white;
    color: black;
    text-decoration: none;
    opacity: 0.5;
    font-size: 18px;
    border-radius: 4px;

    & + .navbar__item {
      margin-left: 10px;
    }

    &.active {
      opacity: 1;
    }
  }
}
</style>
