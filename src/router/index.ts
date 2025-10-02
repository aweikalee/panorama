import { createMemoryHistory, createRouter } from "vue-router"
import Panorama from "@/pages/panorama/index.vue"

const routes = [
  { path: "/", redirect: "/panorama" },
  { path: "/panorama", component: Panorama },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
