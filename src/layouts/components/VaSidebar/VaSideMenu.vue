<template>
<div class="va-side-main">
  <el-scrollbar class="va-side-scroller" wrap-class="va-side-scroller--wrapper">
    <!-- Each all routes -->
    <div class="va-side-nav" v-for="(route, index) in routes" v-if="!route.hidden" :ref="'side_menu_' + index">
      <template v-if="route.children.length > 1">
        <a class="nav-title expander" :class="(current === route.path) ? 'active' : ''"
           @click="expandMenu($refs['side_menu_' + index][0])">
          <va-icon :icon="route.meta.icon"></va-icon>
          <span class="item-name">{{ generateTitle(route.meta.title) }}</span>
          <i class="el-icon-arrow-right expander-icon"></i>
        </a>
        <ul class="nav-dropdown" :class="'child-count-' + route.children.length">
          <li v-for="child in route.children">
            <router-link class="nav-item" :to="route.path + '/' + child.path">
              <va-icon :icon="child.meta.icon"></va-icon>
              <span class="item-name">
                {{ generateTitle(child.meta.title) }}
              </span>
            </router-link>
          </li>
        </ul>
      </template>
      <router-link v-else class="nav-title" :to="route.path + '/' + (route.children[0].path || '')">
        <va-icon :icon="route.children[0].meta.icon"></va-icon>
        <span class="item-name">{{ generateTitle(route.children[0].meta.title) }}</span>
      </router-link>
    </div>

      <!-- Statics for test -->
    <div class="va-side-nav">
      <router-link class="nav-title" to="/others">
        <va-icon icon="mark-others"></va-icon> <span class="item-name">{{ generateTitle('others') }}</span>
      </router-link>
    </div>
  </el-scrollbar>

  <div class="va-side-nav fixed-bottom">
    <router-link class="nav-title" to="/error/402">
      <va-icon icon="action-settings"></va-icon> <span class="item-name">{{ generateTitle('settings') }}</span>
    </router-link>
  </div>
</div>
</template>

<script>
import { generateTitle } from '@/tools/i18n'

export default {
  name: 'VaSideMenu',
  props: {
    routes: { type: Array, required: true }
  },
  computed: {
    current() {
      return '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    expandMenu(target) {
      target.classList.toggle('expanded')
    },
    generateTitle
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.va-side-scroller {
  height: 100%;

  /deep/ .va-side-scroller--wrapper {
    height: 100%;
    overflow-x: hidden;
    padding-bottom: $spacer-xxl;
  }
}
</style>
