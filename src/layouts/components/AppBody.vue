<template>
  <div class="va-body-wrapper">
    <transition name="transform-fade" mode="out-in">
      <router-view v-if="isMobile"/>
      <keep-alive v-else :include="routeCache">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppBody',
  computed: {
    isMobile() { return this.$store.getters.device === 'mobile' },
    routeCache() { return this.$store.getters.tabs_cached },
    key() { return this.$route.name }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";
$transform-distance:  $spacer-sm;

.transform-fade-leave-active,
.transform-fade-enter-active {
  transition: all $transition-duration/2;
}
.transform-fade-enter {
  opacity: 0;
  transform: translate3d(0, $transform-distance, 0);
}
.transform-fade-leave-to {
  opacity: 0;
  transform: translate3d(0, $transform-distance, 0);
}
</style>
