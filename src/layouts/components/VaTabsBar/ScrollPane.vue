<template>
  <el-scrollbar ref="scrollPane" class="va-scroll-container" @wheel.prevent.native="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return { left: 0 }
  },
  methods: {
    handleScroll(e) {
      const data = e.wheelDelta
      const wrapper = this.$refs['scrollPane'].$refs['wrap']
      wrapper.scrollLeft = wrapper.scrollLeft - data / 3
    },
    scrollTo(target) {
      const container = this.$refs['scrollPane'].$el
      const containerWidth = container.offsetWidth
      const wrapper = this.$refs['scrollPane'].$refs['wrap']
      const targetLeft = target.offsetLeft
      const targetWidth = target.offsetWidth
      wrapper.scrollLeft = (targetLeft > containerWidth)
        ? (targetLeft - containerWidth + targetWidth)
        : targetLeft
    }
  }
}
</script>
