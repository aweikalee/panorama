<script setup lang="ts">
import Panorama, {
  type PannellumOptions,
  type PannellumScene,
  type PanoramaRef,
} from "@/components/Panorama.vue"
import { computed, ref } from "vue"
import { sceneOptions } from "@/config"
import { useViewport } from "@/utils/useViewport"
import Navbar from "@/components/Navbar.vue"

const panoramaRef = ref<PanoramaRef>()
const viewport = useViewport()

const activeOption = ref(sceneOptions[0])

const options = computed<PannellumOptions>(() => ({
  default: {
    firstScene: activeOption.value?.sceneId!,
    northOffset: -90 - 37,
    yaw: 90,
  },
  scenes: sceneOptions.reduce((acc, scene) => {
    acc[scene.sceneId] = {
      ...scene,
      hotSpots: sceneOptions
        .filter((o) => o.sceneId !== scene.sceneId)
        .map((o) => {
          // 计算相对位置
          const deltaX = o.$x - scene.$x
          const deltaY = o.$y - scene.$y

          // 计算距离
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

          const yaw = Math.atan2(deltaY, -deltaX) * (180 / Math.PI)
          const pitch = -Math.atan(1200 / distance) * (180 / Math.PI)

          return {
            type: "scene",
            text: o.sceneId,
            sceneId: o.sceneId,
            yaw,
            pitch,
            targetPitch: "same" as any,
            targetHfov: "same" as any,
            targetYaw: "same" as any,
            cssClass: "custom-hotspot",
            createTooltipFunc: hotspot,
            createTooltipArgs: o.sceneId,
          }
        }),
    }
    return acc
  }, {} as Record<string, PannellumScene>),
}))

function hotspot(hotSpotDiv: HTMLElement, args: string) {
  hotSpotDiv.classList.add("custom-tooltip")
  var span = document.createElement("span")
  span.innerHTML = args
  hotSpotDiv.appendChild(span)
}
</script>

<template>
  <div class="container" :style="{ height: viewport.height + 'px' }">
    <Panorama ref="panoramaRef" class="viewer" :options="options" />

    <div class="footer">
      <Navbar />
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

.footer {
  flex-shrink: 0;
}
</style>
