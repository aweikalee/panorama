import { reactive, readonly } from "vue"
import { throttle } from "./throttle"

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape",
}

const state = reactive({
  width: 100,
  height: 100,
  orientation: Orientation.Portrait,
})

function update() {
  state.width = window.innerWidth
  state.height = window.innerHeight

  state.orientation =
    state.height >= state.width ? Orientation.Portrait : Orientation.Landscape
}

update()
window.addEventListener("resize", throttle(update))

export function useViewport() {
  return readonly(state)
}
