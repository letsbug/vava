<template>
  <div class="va-body-container icon-viewer">
    <h4 class="va-body-title">
      {{ $t('icons.usage') }}
    </h4>
    <pre v-highlight><code class="html" v-html="$t('icons.content')"></code></pre>
    <h4 class="va-body-title" v-html="$t('icons.list')"></h4>
    <el-row>
      <el-col v-for="icon of icons" :key="icon" :xl="3" :lg="4" :md="6" :sm="6" :xs="8">
        <div class="grid-content" @click="clipboard(generateIconCode(icon), $event)">
          <div class="va-panels has-interaction icon-item">
            <va-icon class="disabled" :icon="icon" />
            <span>{{ icon }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import icons from './requires';
import { handleClipboard } from '@/utils/clipboard';
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'IconViewer' })
export default class extends Vue {
  // metaInfo: { title: 'Icons' }
  private icons: string[] = icons;

  private clipboard = handleClipboard;

  private generateIconCode(name: string) {
    return `<va-icon icon="${name}"/>`;
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

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

.disabled {
  pointer-events: none;
}
</style>
