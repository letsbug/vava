<template>
  <div :class="background" class="va-body-wrapper">
    <transition name="transform-fade" mode="out-in">
      <router-view v-if="isMobile" />
      <keep-alive v-else :include="cachedRoutes">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isMobile: state => state.application.device === 'mobile',
      cachedRoutes: state => state.tabs.cached
    }),
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
