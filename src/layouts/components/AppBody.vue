<template>
  <div class="app-body">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cached">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppBody',
  computed: {
    cached() {
      console.log(this.$store.state.tabs.cached)
      return this.$store.state.tabs.cached
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .4s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translate3d(-30px, 0, 0);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translate3d(30px, 0, 0);
  }
</style>
