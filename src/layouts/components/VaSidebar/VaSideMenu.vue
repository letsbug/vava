<template>
  <div class="va-side-main">
    <el-scrollbar class="va-side-scroller" wrap-class="va-side-scroller--wrapper">
      <!-- Each all routes -->
      <div v-for="(route, index) in routes" v-if="!route.hidden" :key="route.path" :ref="'side_menu_' + index" class="va-side-nav">
        <template v-if="route.children.length > 1">
          <a
            :class="(current === route.path) ? 'active' : ''" class="nav-title expander"
            @click="expandMenu($refs['side_menu_' + index][0])"
          >
            <va-icon :icon="route.meta.icon"/>
            <span class="item-name">{{ generateTitle(route.meta.title) }}</span>
            <i class="el-icon-arrow-right expander-icon"></i>
          </a>
          <ul :class="'child-count-' + route.children.length" class="nav-dropdown">
            <li v-for="child in route.children" :key="child.path">
              <router-link :to="route.path + '/' + child.path" class="nav-item">
                <va-icon :icon="child.meta.icon"/>
                <span class="item-name">
                  {{ generateTitle(child.meta.title) }}
                </span>
              </router-link>
            </li>
          </ul>
        </template>
        <router-link v-else :to="route.path + '/' + (route.children[0].path || '')" class="nav-title">
          <va-icon :icon="route.children[0].meta.icon"/>
          <span class="item-name">{{ generateTitle(route.children[0].meta.title) }}</span>
        </router-link>
      </div>

      <!-- Statics for test -->
      <div class="va-side-nav">
        <router-link class="nav-title" to="/others">
          <va-icon icon="mark-others"/> <span class="item-name">{{ generateTitle('others') }}</span>
        </router-link>
      </div>
    </el-scrollbar>

    <div class="va-side-nav fixed-bottom">
      <router-link class="nav-title" to="/error/403">
        <va-icon icon="action-settings"/> <span class="item-name">{{ generateTitle('settings') }}</span>
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
