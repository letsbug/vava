<template>
  <div class="va-side-main">
    <el-scrollbar class="va-side-scroller" wrap-class="va-side-scroller--wrapper">
      <!-- Each all routes -->
      <template v-for="route in routes">
        <nav-item v-if="!route.hidden" :key="route.path" :route="route" />
      </template>
    </el-scrollbar>

    <div class="va-side-nav fixed-bottom">
      <router-link class="nav-title" to="/error/403">
        <va-icon icon="action-settings" />
        <span class="item-name">
          {{ generateTitle('settings') }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IStoreRoutes } from '@/store/modules/routes';
import { generateTitle } from '@/i18n';
import NavItem from './NavItem.vue';

@Component({ name: 'VaSideMenu', components: { NavItem } })
export default class extends Vue {
  get routes() {
    return IStoreRoutes.routes;
  }

  generateTitle: Function = generateTitle;
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.va-side-scroller {
  height: 100%;

  /deep/ {
    .va-side-scroller--wrapper {
      height: 100%;
      overflow-x: hidden;
      padding-bottom: $spacer-xxl;
    }

    .el-scrollbar__bar.is-horizontal {
      display: none;
    }
  }
}
</style>
