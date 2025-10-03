import type { PannellumScene } from "@/components/Panorama.vue"
import { getAssets } from "@/utils/oss"

type Scene = PannellumScene & {
  sceneId: string
  $x: number
  $y: number
}

type PannellumGroup = {
  name: string
  title: string

  scenes: Scene[]
}

const mainScene: Scene[] = [
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

export const sceneOptions: PannellumGroup[] = [
  {
    name: "main",
    title: "全景图",
    scenes: mainScene,
  },
  {
    name: "test",
    title: "全景图2",
    scenes: mainScene,
  },
]
