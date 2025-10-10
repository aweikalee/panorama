import type { PannellumScene } from "@/components/Panorama.vue"
import { getAssets } from "@/utils/oss"

type Scene = PannellumScene & {
  sceneId: string
  $x: number
  $z: number
}

type PannellumGroup = {
  name: string
  title: string

  scenes: Scene[]
}

export const sceneOptions: PannellumGroup[] = [
  {
    name: "main",
    title: "全景图(夜晚)",
    scenes: [
      {
        sceneId: "餐厅",
        $x: 5.1,
        $z: -6.3831,
        panorama: getAssets("夜晚/餐厅.jpg"),
      },
      {
        sceneId: "客厅",
        $x: 5.1,
        $z: -3.1523,
        panorama: getAssets("白天/客厅.jpg"),
      },
      {
        sceneId: "厨房",
        $x: 5.1,
        $z: -10.3351,
        panorama: getAssets("夜晚/厨房.jpg"),
      },
      {
        sceneId: "干区",
        $x: 7.1674,
        $z: -4.8377,
        panorama: getAssets("夜晚/干区.jpg"),
      },
      {
        sceneId: "主卫",
        $x: 9.0312,
        $z: -4.8377,
        panorama: getAssets("夜晚/主卫.jpg"),
      },
      {
        sceneId: "次卫",
        $x: 8.8213,
        $z: -7.723,
        panorama: getAssets("夜晚/次卫.jpg"),
      },
      {
        sceneId: "主卧",
        $x: 9.0,
        $z: -3.7415,
        panorama: getAssets("夜晚/主卧.jpg"),
      },
      {
        sceneId: "次卧",
        $x: 1.5693,
        $z: -2.3296,
        panorama: getAssets("夜晚/次卧.jpg"),
      },
      {
        sceneId: "书房",
        $x: 8.261,
        $z: -10.3351,
        panorama: getAssets("夜晚/书房.jpg"),
      },
      {
        sceneId: "过道",
        $x: 7.6004,
        $z: -8.5000,
        panorama: getAssets("夜晚/过道.jpg"),
      },
      {
        sceneId: "储物间",
        $x: 7.7912,
        $z: -6.9239,
        panorama: getAssets("夜晚/储物间.jpg"),
      },
      {
        sceneId: "设备平台",
        $x: 2.579,
        $z: -11.4363,
        panorama: getAssets("夜晚/设备平台.jpg"),
      },
    ],
  },
  {
    name: "daytime",
    title: "全景图(白天)",
    scenes: [
      {
        sceneId: "餐厅",
        $x: 5.1,
        $z: -6.3831,
        panorama: getAssets("白天/餐厅.jpg"),
      },
      {
        sceneId: "客厅",
        $x: 5.1,
        $z: -3.1523,
        panorama: getAssets("白天/客厅.jpg"),
      },
      {
        sceneId: "厨房",
        $x: 5.1,
        $z: -10.3351,
        panorama: getAssets("白天/厨房.jpg"),
      },
      {
        sceneId: "干区",
        $x: 7.1674,
        $z: -4.8377,
        panorama: getAssets("白天/干区.jpg"),
      },
      {
        sceneId: "主卫",
        $x: 9.0312,
        $z: -4.8377,
        panorama: getAssets("白天/主卫.jpg"),
      },
      {
        sceneId: "次卫",
        $x: 8.8213,
        $z: -7.723,
        panorama: getAssets("白天/次卫.jpg"),
      },
      {
        sceneId: "主卧",
        $x: 9.0,
        $z: -2.3296,
        panorama: getAssets("白天/主卧.jpg"),
      },
      {
        sceneId: "次卧",
        $x: 1.5693,
        $z: -2.3296,
        panorama: getAssets("白天/次卧.jpg"),
      },
      {
        sceneId: "书房",
        $x: 8.261,
        $z: -10.3351,
        panorama: getAssets("白天/书房.jpg"),
      },
      {
        sceneId: "设备平台",
        $x: 2.579,
        $z: -11.4363,
        panorama: getAssets("白天/设备平台.jpg"),
      },
    ],
  },
]
