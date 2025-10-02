<template>
  <div ref="panoramaContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import "pannellum"
import "pannellum/build/pannellum.css"

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

const initPanorama = () => {
  if (!panoramaContainer.value) return

  const config: any = {
    // type: "equirectangular",
    ...(props.options ?? {}),
  }

  viewer?.destroy()
  viewer = pannellum.viewer(panoramaContainer.value, config)
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

watch(
  () => props.options,
  () => {
    destroyViewer()
    initPanorama()
  }
)

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
