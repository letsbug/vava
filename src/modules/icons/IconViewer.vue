<template>
  <div class="va-body-container icon-viewer">
    <h4 class="va-body-title">
      {{ $t('icons.usage') }}
    </h4>
    <pre v-highlight><code class="html" v-html="$t('icons.content')"></code></pre>
    <h4 class="va-body-title" v-html="$t('icons.list')"></h4>
    <el-row>
      <el-col v-for="icon of icons" :key="icon" :xl="3" :lg="4" :md="6" :sm="6" :xs="8">
        <div class="grid-content" @click="handleClipboard(generateIconCode(icon), $event)">
          <div class="va-panels has-interaction icon-item">
            <va-icon :icon="icon" />
            <span>{{ icon }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Highlight } from '@/directives'
import icons from './requires'
import { clipboard } from '@/tools'

export default {
  name: 'IconViewer',
  metaInfo: {
    title: 'Icons'
  },
  directives: { Highlight },
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
@import "~@/styles/_variables";

.grid-content {
  padding: $spacer-xs $spacer-sm;

  .icon-item {
    font-size: $font-size-h1;
    text-align: center;
    padding: $spacer-lg 0;

    &:hover {
      box-shadow: 0 $shadow-lg-offset $shadow-lg-distance $shadow-lg-size rgba($color-black, 0.08);
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
