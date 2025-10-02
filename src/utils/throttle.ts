export const throttle = (method: (...args: any[]) => void, interval = 100) => {
  let timer: any

  return (...args: any[]) => {
    if (timer === undefined) {
      timer = setTimeout(() => {
        method(...args)
        timer = undefined
      }, interval)
    }
  }
}
