import type { PannellumScene } from "@/components/Panorama.vue"
import { getAssets } from "@/utils/oss"

export const sceneOptions: (PannellumScene & {
  sceneId: string
  $x: number
  $y: number
})[] = [
  {
    sceneId: "餐厅",
    $x: 5000,
    $y: 6300,
    panorama: getAssets("主方案_2025-10-02T06_42_20.7966195Z.jpg"),
  },
  {
    sceneId: "客厅",
    $x: 5000,
    $y: 2800,
    panorama: getAssets("主方案_2025-10-02T06_51_22.0568531Z.jpg"),
  },
  {
    sceneId: "厨房",
    $x: 5000,
    $y: 10000,
    panorama: getAssets("主方案_2025-10-02T06_44_12.5104749Z.jpg"),
  },
  {
    sceneId: "干区",
    $x: 7000,
    $y: 4500,
    panorama: getAssets("主方案_2025-10-02T06_49_27.3059397Z.jpg"),
  },
  {
    sceneId: "主卫",
    $x: 8600,
    $y: 4500,
    panorama: getAssets("主方案_2025-10-02T06_56_21.9294673Z.jpg"),
  },
  {
    sceneId: "次卫",
    $x: 8600,
    $y: 7600,
    panorama: getAssets("主方案_2025-10-02T06_45_58.4045086Z.jpg"),
  },
  {
    sceneId: "主卧",
    $x: 7500,
    $y: 2220,
    panorama: getAssets("主方案_2025-10-02T06_57_58.7295883Z.jpg"),
  },
  {
    sceneId: "次卧",
    $x: 1430,
    $y: 2220,
    panorama: getAssets("主方案_2025-10-02T06_47_35.8547777Z.jpg"),
    yaw: -90,
  },
  {
    sceneId: "书房",
    $x: 7500,
    $y: 10800,
    panorama: getAssets("主方案_2025-10-02T06_54_42.2950157Z.jpg"),
  },
  {
    sceneId: "设备平台",
    $x: 1430,
    $y: 10800,
    panorama: getAssets("主方案_2025-10-02T06_53_01.1423488Z.jpg"),
  },
]

sceneOptions.forEach((item) => {
  item.hotSpots = sceneOptions
    .filter((o) => o.sceneId !== item.sceneId)
    .map((o) => {
      // 计算相对位置
      const deltaX = o.$x - item.$x
      const deltaY = o.$y - item.$y

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
    })
})

function hotspot(hotSpotDiv: HTMLElement, args: string) {
  hotSpotDiv.classList.add("custom-tooltip")
  var span = document.createElement("span")
  span.innerHTML = args
  hotSpotDiv.appendChild(span)
}
