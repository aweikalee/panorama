<template>
  <div ref="panoramaContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue"
import "pannellum"
import "pannellum/build/pannellum.css"
import { Orientation, useViewport } from "@/utils/useViewport"

export type PannellumScene = Parameters<typeof pannellum.viewer>[1]
export type PannellumOptions = {
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

const options = computed(() => {
  return {
    autoLoad: true,
    autoRotate: -2,
    compass: true,
    showControls: false,
    touchPanSpeedCoeffFactor: 1.5, // 触摸时平移速度 默认1
    orientationOnByDefault: false,
    hfov: hfov.value,
    ...props.options,
  }
})

const initPanorama = () => {
  if (!panoramaContainer.value) return
  viewer = pannellum.viewer(panoramaContainer.value, options.value)
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
  startOrientation: () => {
    viewer.startOrientation()
  },
  stopOrientation: () => {
    viewer.stopOrientation()
  },
})
</script>
