<template>
  <div class="va-body-container icon-viewer">
    <h4 class="va-body-title">SVG Icons&nbsp;&nbsp;<small class="text-muted">Provides a set of commonly used ICONS</small></h4>
    <blockquote>
      <p>You can use the built-in SVG icons by using the <code>va-icon</code> component.</p>
      <p>Click them to copy the code.</p>
    </blockquote>
    <el-row>
      <el-col :span="4" v-for="icon of icons" :key="icon">
        <div class="grid-content" @click.stop="clipboard(generateIconCode(icon), $event)">
          <el-tooltip placement="top" :content="generateIconCode(icon)">
            <div class="icon-item">
              <va-icon :icon="icon"></va-icon>
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
import { Clipboard } from '@/tools'

export default {
  name: 'SystemIcons',
  data() {
    return { icons }
  },
  methods: {
    generateIconCode(name) {
      return `<va-icon icon="${name}"></va-icon>`
    },
    clipboard(code, event) {
      Clipboard.copy(code, event)
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
    cursor: pointer;

    > span {
      display: block;
      margin-top: $spacer-sm;
      font-size: $font-size-h5;
    }
  }
}
</style>
