<template>
  <a class="va-nav-item" @click="handleScreenToggle">
    <va-icon :icon="isFullScreen ? 'action-screen-small' : 'action-screen-full'" class="handle-screen-full"/>
  </a>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'index',
  data() {
    return {
      isFullScreen: ScreenFull.isFullscreen
    }
  },
  methods: {
    browserSupported() {
      const supported = ScreenFull.enabled
      if (!supported) this.$message({
        type: 'warning',
        message: 'Your browser can not work'
      })
      return supported
    },
    handleScreenToggle() {
      if (this.browserSupported()) ScreenFull.toggle()
    }
  },
  mounted() {
    ScreenFull.onchange(() => {
      this.isFullScreen = ScreenFull.isFullscreen
    })
  }
}
</script>
