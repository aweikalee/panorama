import { createWebHistory, createRouter } from "vue-router"
import Panorama from "@/pages/panorama/index.vue"
import Gallery from "@/pages/gallery/index.vue"

const routes = [
  { path: "/", redirect: "/panorama/main" },
  { path: "/panorama/:group", component: Panorama },
  { path: "/gallery", component: Gallery },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
