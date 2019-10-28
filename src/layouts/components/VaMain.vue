<template>
  <div :class="background" class="va-body-wrapper">
    <transition name="transform-fade" mode="out-in">
      <router-view v-if="isMobile" />
      <keep-alive v-else :include="cachedRoutes">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IStoreSystem } from '@/store/modules/system';
import { IStoreTabs } from '@/store/modules/tabs';

@Component({ name: 'VaMain' })
export default class extends Vue {
  private get isMobile() {
    return IStoreSystem.device === 0;
  }

  private get cachedRoutes() {
    return IStoreTabs.cached;
  }

  private get key() {
    return this.$route.name;
  }

  private get background() {
    return this.$route.meta['withoutBackground'] ? 'no-bg' : '';
  }
}
</script>

<style scoped lang="scss">
.va-body-wrapper /deep/ {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
    overflow-y: scroll !important;
    margin-bottom: 0 !important;
  }

  .el-scrollbar__view {
    width: 100%;

    .va-body-container {
      width: 100%;
    }
  }
}
</style>
