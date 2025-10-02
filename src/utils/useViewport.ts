import { onBeforeUnmount, onMounted, reactive } from "vue"

export function useViewport() {
  const rect = reactive({
    width: 100,
    height: 100,
  })

  function update() {
    rect.width = window.innerWidth
    rect.height = window.innerHeight
  }

  onMounted(() => {
    update()
    window.addEventListener("resize", update)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("resize", update)
  })
  return rect
}
