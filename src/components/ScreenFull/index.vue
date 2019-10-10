<template>
  <a id="screenFull" class="va-nav-item" @click="toggle">
    <va-icon :icon="isFullScreen ? 'action-screen-small' : 'action-screen-full'" class="handle-screen-full" />
  </a>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

const sf = screenfull;

@Component({ name: 'ScreenFull' })
export default class extends Vue {
  private isFullScreen: boolean = false;

  get supported() {
    const s = sf && sf.isEnabled;
    if (!s)
      this.$message({
        type: 'warning',
        message: 'Your browser can not work'
      });
    return s;
  }

  mounted() {
    if (this.supported) {
      sf.on('change', this.change);
    }
  }

  beforeDestory() {}

  private change() {
    if (this.supported) {
      this.isFullScreen = sf.isFullscreen;
    }
  }

  private toggle() {
    if (this.supported) sf.toggle();
  }
}
</script>
