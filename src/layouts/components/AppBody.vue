<template>
  <el-scrollbar class="va-body-wrapper" :class="background">
    <transition name="transform-fade" mode="out-in">
      <router-view v-if="isMobile"/>
      <keep-alive v-else :include="cachedRoutes">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppBody',
  computed: {
    isMobile() { return this.$store.getters.device === 'mobile' },
    cachedRoutes() { return this.$store.getters.tabs_cached },
    key() { return this.$route.name },
    background() { return this.$route.meta['nobg'] ? 'no-bg' : '' }
  }
}
</script>

<style scoped lang="scss">

.va-body-wrapper /deep/ {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
    margin-bottom: 0 !important;
  }

  .el-scrollbar__view {
    width: 100%;

    .va-body-container {
      width: 100%;
    }
  }
}
</style>
