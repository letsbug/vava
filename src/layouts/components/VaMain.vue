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
  get isMobile() {
    return IStoreSystem.device === 0;
  }

  get cachedRoutes() {
    return IStoreTabs.cached;
  }

  get key() {
    return this.$route.name;
  }

  get background() {
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
