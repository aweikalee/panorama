import type { PannellumOptions } from "@/components/Panorama.vue"

function getAssets(src: string) {
  return `https://awwwk.oss-cn-hangzhou.aliyuncs.com/panorama/${src}`
}

export const sceneOptions: (PannellumOptions & {
  $title: string
})[] = [
  {
    $title: "客厅",
    panorama: getAssets("主方案_2025-10-02T06_51_22.0568531Z.jpg"),
    yaw: 90,
  },
  {
    $title: "餐厅",
    panorama: getAssets("主方案_2025-10-02T06_42_20.7966195Z.jpg"),
    yaw: 180,
  },
  {
    $title: "厨房",
    panorama: getAssets("主方案_2025-10-02T06_44_12.5104749Z.jpg"),
    yaw: -90,
  },
  {
    $title: "干区",
    panorama: getAssets("主方案_2025-10-02T06_49_27.3059397Z.jpg"),
    yaw: 90,
  },
  {
    $title: "主卫",
    panorama: getAssets("主方案_2025-10-02T06_56_21.9294673Z.jpg"),
    yaw: 90,
  },
  {
    $title: "次卫",
    panorama: getAssets("主方案_2025-10-02T06_45_58.4045086Z.jpg"),
    yaw: 90,
  },
  {
    $title: "主卧",
    panorama: getAssets("主方案_2025-10-02T06_57_58.7295883Z.jpg"),
    yaw: -90,
  },
  {
    $title: "次卧",
    panorama: getAssets("主方案_2025-10-02T06_47_35.8547777Z.jpg"),
    yaw: -90,
  },
  {
    $title: "书房",
    panorama: getAssets("主方案_2025-10-02T06_54_42.2950157Z.jpg"),
    yaw: 90,
  },
  {
    $title: "设备平台",
    panorama: getAssets("主方案_2025-10-02T06_53_01.1423488Z.jpg"),
    yaw: 0,
  },
]
