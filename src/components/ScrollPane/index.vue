<template>
  <el-scrollbar ref="scrollPane" class="va-scroll-container" :vertical="false" @wheel.prevent.native="handleScroll">
    <slot/>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'index',
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
      wrapper.scrollLeft = (targetLeft > containerWidth) ? (targetLeft - containerWidth + targetWidth) : targetLeft
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.va-scroll-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  /deep/ {
    .el-scrollbar__wrap {
      height: $tabs-height + 23px;
    }

    .el-scrollbar__view {
      display: inline-block;
      font-size: 1rem;
    }

    .el-scrollbar__bar {
      bottom: 0;
    }
  }
}
</style>
