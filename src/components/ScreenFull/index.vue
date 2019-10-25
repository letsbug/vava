<template>
  <a id="screenFull" class="va-nav-item" @click="toggle">
    <va-icon :icon="isFullscreen ? 'action-screen-small' : 'action-screen-full'" class="handle-screen-full" />
  </a>
</template>

<script lang="ts">
import screenfull, { Screenfull } from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

const sf = screenfull as Screenfull;

@Component({ name: 'ScreenFull' })
export default class extends Vue {
  isFullscreen: boolean = false;

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

  beforeDestory() {
    if (this.supported) {
      sf.off('change', this.change);
    }
  }

  private change() {
    if (this.supported) {
      this.isFullscreen = sf.isFullscreen;
    }
  }

  private toggle() {
    if (this.supported) sf.toggle();
  }
}
</script>
