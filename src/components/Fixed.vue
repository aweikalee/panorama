<template>
  <div class="fixed" :class="[position]" :style="{ zIndex }" ref="el">
    <slot name="default"></slot>
    <div v-if="safeAreaInsetBottom" class="fixed__safe-area-inset-bottom"></div>
  </div>

  <div
    class="fixed-holder"
    :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }"
    v-if="holder"
  >
    <slot name="default"></slot>
    <div v-if="safeAreaInsetBottom" class="fixed__safe-area-inset-bottom"></div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    className?: string
    position: "top" | "bottom"
    holder?: boolean
    zIndex?: number
    safeAreaInsetBottom?: boolean
  }>(),
  {
    position: "top",
    holder: true,
    zIndex: 1000,
    safeAreaInsetBottom: false,
  }
)
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  left: 0;
  right: 0;

  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
}

.fixed-holder {
  flex-shrink: 0;
  position: relative;
  z-index: -9999999999;
  visibility: hidden;
}

.fixed__safe-area-inset-bottom {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
