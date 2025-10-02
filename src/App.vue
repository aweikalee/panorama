<script setup lang="ts">
import Panorama, {
  type PannellumOptions,
  type PannellumScene,
  type PanoramaRef,
} from "./components/Panorama.vue"
import { computed, ref } from "vue"
import { sceneOptions } from "./config"
import { useViewport } from "./utils/useViewport"

const panoramaRef = ref<PanoramaRef>()
const viewport = useViewport()

const activeOption = ref(sceneOptions[0])

// 根据视口宽高比计算合适的 hfov
const hfov = computed(() => {
  const portrait = 60
  const landscape = 75

  return viewport.width > viewport.height ? landscape : portrait
})

const options = computed<PannellumOptions>(() => ({
  default: {
    firstScene: activeOption.value?.sceneId!,
    autoLoad: true,
    autoRotate: 2,
    compass: true,
    northOffset: -90 - 37,
    hfov: hfov.value, // 根据视口宽高比动态计算
    touchPanSpeedCoeffFactor: 1.2, // 触摸时平移速度 默认1
    orientationOnByDefault: false,
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
    :style="{ height: viewport.height + 'px' }"
    @click="startOrientation"
  >
    <Panorama ref="panoramaRef" class="viewer" :options="options" />

    <div class="controls" v-if="false">
      <div class="scene">
        <button
          class="scene-button"
          :class="{
            active: activeOption?.sceneId === scene.sceneId,
          }"
          v-for="scene in sceneOptions"
          :key="scene.sceneId"
          @click="activeOption = scene"
        >
          {{ scene.sceneId }}
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
