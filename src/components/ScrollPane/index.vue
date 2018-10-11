<template>
  <el-scrollbar ref="scrollPane" class="va-scroll-container" :vertical="false" @wheel.prevent.native="handleScroll">
    <slot/>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'index',
  metaInfo: {
    title: 'index'
  },
  data() {
    return { left: 0 }
  },
  methods: {
    handleScroll(e) {
      const data = e.wheelDelta
      console.log(data)
      const wrapper = this.$refs['scrollPane'].$refs['wrap']
      wrapper.scrollLeft = wrapper.scrollLeft - data / 3
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
    .el-scrollbar__bar {
      bottom: 0;
    }

    .el-scrollbar__wrap {
      height: $tabs-height + 18px;
    }
  }
}
</style>
