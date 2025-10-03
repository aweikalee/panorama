<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue"
import "pannellum"
import "pannellum/build/pannellum.css"
import { Orientation, useViewport } from "@/utils/useViewport"

export type PannellumScene = Parameters<typeof pannellum.viewer>[1]
export type PannellumOptions = PannellumScene & {
  default: {
    firstScene: string
  } & PannellumScene

  scenes: Record<string, PannellumScene>
}

const props = defineProps<{
  options: PannellumOptions
}>()

const panoramaContainer = ref<HTMLElement>()
let viewer: any = null

const viewport = useViewport()

// 根据视口宽高比计算合适的初始 hfov
const hfov = computed(() => {
  const portrait = 60
  const landscape = 90

  return viewport.orientation === Orientation.Landscape ? landscape : portrait
})

const options = computed<PannellumOptions>(() => {
  return {
    autoLoad: true,
    autoRotate: -2,
    showControls: false,
    touchPanSpeedCoeffFactor: 1.5, // 触摸时平移速度 默认1
    orientationOnByDefault: false,
    hfov: hfov.value,
    sceneFadeDuration: 1000,
    compass: true,
    ...props.options,
  }
})

/* 陀螺仪 */
const isActiveOrientation = ref(false)
const isMobile = "ontouchstart" in window
async function startOrientation() {
  viewer.startOrientation()
  isActiveOrientation.value = true
}
function stopOrientation() {
  isActiveOrientation.value = false
  viewer.stopOrientation()
}

/* 初始化 */
const initPanorama = () => {
  if (!panoramaContainer.value) return
  viewer = pannellum.viewer(panoramaContainer.value, options.value)

  viewer.on("touchstart", () => {
    stopOrientation()
  })
  viewer.on("mousedown", () => {
    stopOrientation()
  })
}

const destroyViewer = () => {
  if (viewer) {
    try {
      viewer.destroy()
      viewer = null
    } catch (error) {
      console.warn("Error destroying pannellum viewer:", error)
    }
  }
}

onMounted(() => {
  initPanorama()
})

onBeforeUnmount(() => {
  destroyViewer()
})

watch(options, () => {
  destroyViewer()
  initPanorama()
})

export type PanoramaRef = {
  viewer: any
  reload: () => void
  startOrientation: () => void
  stopOrientation: () => void
}

defineExpose<PanoramaRef>({
  viewer,
  reload: () => {
    destroyViewer()
    initPanorama()
  },
  startOrientation,
  stopOrientation,
})
</script>

<template>
  <div class="panorama">
    <div ref="panoramaContainer"></div>

    <div class="panorama__controls">
      <button
        v-if="isMobile"
        :class="{
          active: isActiveOrientation,
        }"
        @click="isActiveOrientation ? stopOrientation : startOrientation"
      >
        陀螺仪
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panorama {
  position: relative;

  .panorama__controls {
    position: absolute;
    top: 20px;
    right: 20px;

    > button {
      appearance: none;
      background-color: rgba(black, 0.8);
      color: white;
      border: 2px solid transparent;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.6;
      }
      &.active {
        border-color: var(--color-primary);
      }
    }
  }
}
</style>
