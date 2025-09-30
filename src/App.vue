<script setup lang="ts">
import Panorama, {
  type PannellumOptions,
  type PanoramaRef,
} from "./components/Panorama.vue"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { sceneOptions } from "./config"

const panoramaRef = ref<PanoramaRef>()

const activeOption = ref(sceneOptions[0])

const options = computed<PannellumOptions>(() => ({
  autoLoad: true,
  autoRotate: 2,
  northOffset: -90 - 37,
  compass: true,
  hfov: 60, // 摄像机视角
  yaw: 90, // 初始旋转角度 正值向右 负值向左
  touchPanSpeedCoeffFactor: 1.2, // 触摸时平移速度 默认1
  orientationOnByDefault: false,

  ...activeOption.value,
}))

const containerHeight = ref(0)
function onResize() {
  containerHeight.value = window.innerHeight
}
onMounted(() => {
  onResize()
  window.addEventListener("resize", onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
})

const isOrientationApplied = ref(false)
async function startOrientation() {
  if (isOrientationApplied.value) return
  isOrientationApplied.value = true

  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof (DeviceMotionEvent as any).requestPermission === "function"
  ) {
    // 需要用户交互触发（如点击按钮）
    ;(DeviceMotionEvent as any)
      .requestPermission()
      .then((response: any) => {
        if (response === "granted") {
          panoramaRef.value?.startOrientation()
        } else {
          console.warn("用户拒绝了陀螺仪权限")
        }
      })
      .catch(console.error)
  } else {
    panoramaRef.value?.startOrientation()
  }
}
</script>

<template>
  <div
    class="container"
    :style="{ height: containerHeight + 'px' }"
    @click="startOrientation"
  >
    <Panorama ref="panoramaRef" class="viewer" :options="options" />

    <div class="controls">
      <div class="scene">
        <button
          class="scene-button"
          :class="{
            active: activeOption?.$title === scene.$title,
          }"
          v-for="scene in sceneOptions"
          :key="scene.$title"
          @click="activeOption = scene"
        >
          {{ scene.$title }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;

  display: flex;
  flex-direction: column;
}

.viewer {
  flex-grow: 1;
  min-height: 0;
}

.controls {
  background: rgba(0, 0, 0, 0.8);
  color: white;

  .scene {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 20px;

    .scene-button {
      display: inline-block;
      appearance: none;
      height: 40px;
      padding: 0 20px;
      background-color: white;
      opacity: 0.5;

      & + .scene-button {
        margin-left: 10px;
      }

      &:active {
        opacity: 0.8;
      }
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
