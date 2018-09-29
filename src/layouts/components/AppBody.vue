<template>
  <div class="va-body-wrapper">
    <transition name="transform-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppBody'
}
</script>

<style scoped>
  .transform-fade-leave-active,
  .transform-fade-enter-active {
    transition: all .4s;
  }
  .transform-fade-enter {
    opacity: 0;
    transform: translate3d(-30px, 0, 0);
  }
  .transform-fade-leave-to {
    opacity: 0;
    transform: translate3d(30px, 0, 0);
  }
</style>
