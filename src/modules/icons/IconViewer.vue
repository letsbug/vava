<template>
  <div class="va-body-container icon-viewer">
    <h4 class="va-body-title">SVG Icons&nbsp;&nbsp;<small class="text-muted">Sets of ICONS used by the system itself.</small></h4>
    <blockquote>
      <p>You can use the built-in SVG icons by using the <code>va-icon</code> component. Click them to copy the code.</p>
    </blockquote>
    <el-row>
      <el-col :xl="3" :lg="4" :md="6" :sm="6" :xs="8" v-for="icon of icons" :key="icon">
        <div class="grid-content" @click="handleClipboard(generateIconCode(icon), $event)">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateIconCode(icon) }}
            </div>
            <div class="icon-item">
              <va-icon :icon="icon"/>
              <span>{{ icon }}</span>
            </div>
          </el-tooltip>
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
  .icon-item {
    font-size: $font-size-h1;
    text-align: center;
    padding: $spacer-lg 0;
    margin: 0 $spacer-base;
    border: solid $border-default-width transparent;
    border-radius: $radius-base;
    cursor: pointer;

    transition: $transition-border, $transition-transform;

    &:hover {
      border-color: $color-theme;
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 $shadow-lg-offset $shadow-lg-distance $shadow-lg-size rgba($color-theme, 0.2);
    }

    > span {
      display: block;
      margin-top: $spacer-sm;
      font-size: $font-size-h6;
    }
  }
}
</style>
