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
        <va-icon icon="action-settings" /> <span class="item-name">
          {{ generateTitle('settings') }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavItem from './NavItem'
import { generateTitle } from '@/i18n'

export default {
  components: { NavItem },
  props: {
    routes: { type: Array, required: true }
  },
  methods: {
    generateTitle
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

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
