<template>
  <div :class="background" class="va-body-wrapper">
    <Transition name="transform-fade" mode="out-in">
      <RouterView v-if="isMobile" />
      <KeepAlive v-else :include="cachedRoutes">
        <RouterView :key="key" />
      </KeepAlive>
    </Transition>
  </div>
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
    overflow-y: scroll !important;
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
