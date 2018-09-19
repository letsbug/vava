<template>
<div class="va-side-main">
  <!-- Each all routes -->
  <div v-for="(route, index) in routes" v-if="!route.hidden" :ref="'side_menu_' + index" class="va-side-nav">
    <template v-if="route.children.length > 1">
      <a class="nav-title expander" @click.stop.prevent="expandMenu($refs['side_menu_' + index][0])">
        <va-icon :icon="route.meta.icon"></va-icon>
        <span class="item-name">{{ route.meta.title }}</span>
        <i class="el-icon-arrow-right expander-icon"></i>
      </a>
      <ul class="nav-dropdown" :class="'child-count-' + route.children.length">
        <li v-for="child in route.children">
          <router-link class="nav-item" :to="route.path + '/' + child.path">
            <va-icon icon="browser"></va-icon> <span class="item-name">website</span>
          </router-link>
        </li>
      </ul>
    </template>
    <router-link v-else class="nav-title" :to="route.path + (route.children[0].path ? ('/' + route.children[0].path) : '')">
      <va-icon :icon="route.children[0].meta.icon"></va-icon> <span class="item-name">{{ route.children[0].meta.title }}</span>
    </router-link>
  </div>

  <!-- Statics for test -->
  <div class="va-side-nav">
    <router-link class="nav-title" to="/error/401">
      <va-icon icon="others"></va-icon> <span class="item-name">others</span>
    </router-link>
  </div>

  <div class="va-side-nav fixed-bottom">
    <router-link class="nav-title" to="/error/402">
      <va-icon icon="settings"></va-icon> <span class="item-name">Settings</span>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'VaSideMenu',
  props: {
    routes: { type: Array, required: true }
  },
  created() {
    console.log(this.routes.toString())
  },
  computed: {},
  methods: {
    expandMenu(target) {
      target.classList.toggle('expanded')
    }
    // TODO Add current route styles '.active' to first level menu.
    // TODO create close & open function with side-menu.
    // TODO Automatically open or close the side menu bar When router changed.
  }
}
</script>
