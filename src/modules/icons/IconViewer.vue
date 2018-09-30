<template>
  <div class="va-body-container icon-viewer">
    <h4 class="va-body-title">
      Usage
    </h4>
    <pre v-highlight><code class="html">
      Just use <strong>va-icon</strong> component to use icons, Like &lt;va-icon icon="dashboard"/&gt;.
    </code></pre>
    <h4 class="va-body-title">
      Icons&nbsp;&nbsp;
      <small class="text-muted hidden-sm-and-down">Click them to copy HTML.</small>
    </h4>
    <el-row>
      <el-col :xl="3" :lg="4" :md="6" :sm="6" :xs="8" v-for="icon of icons" :key="icon">
        <div class="grid-content" @click="handleClipboard(generateIconCode(icon), $event)">
          <div class="icon-item">
            <va-icon :icon="icon"/>
            <span>{{ icon }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import icons from './requires'
import { clipboard } from '@/tools'

export default {
  name: 'IconViewer',
  metaInfo: {
    title: 'Icons'
  },
  data() {
    return { icons }
  },
  methods: {
    generateIconCode(name) {
      return `<va-icon icon="${name}"/>`
    },
    handleClipboard(code, e) {
      clipboard(code, e)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.grid-content {
  padding: $spacer-xs $spacer-sm;

  .icon-item {
    font-size: $font-size-h1;
    text-align: center;
    padding: $spacer-lg 0;
    border: solid $border-default-width transparent;
    border-radius: $radius-base;
    cursor: pointer;

    transition: $transition-border, $transition-transform, $transition-color;

    &:hover {
      border-color: $color-theme;
      color: $color-theme;
      box-shadow: 0 $shadow-lg-offset $shadow-lg-distance $shadow-lg-size rgba($color-theme, 0.2);
      transform: translate3d(0, -3px, 0);
    }

    > span {
      display: block;
      margin-top: $spacer-sm;
      font-size: $font-size-h6;
    }
  }
}
</style>
