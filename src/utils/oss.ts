export function getAssets(src: string) {
  return `https://awwwk.oss-cn-hangzhou.aliyuncs.com/panorama/${src}`
}

export function getThumbnail(src: string, width = 200) {
  return `${src}?x-oss-process=image/resize,w_${width}`
}
