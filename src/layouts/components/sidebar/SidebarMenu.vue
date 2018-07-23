<template>
  <ul class="sidebar-menu">
    <template v-for="(route, index) in routes" v-if="!route.hidden">
      <li class="menu-item" v-if="route.children.length <= 1">
        <router-link class="item-link" :to="route.path + '/' + route.children[0].path">
          <svg class="icon-svg" aria-hidden="true"><use :xlink:href="'#if-' + route.children[0].meta.icon"></use></svg>
          <cite>{{ route.children[0].meta.title }}</cite>
        </router-link>
      </li>
      <li class="menu-item" :ref="'subMenu' + index" v-else>
        <a class="item-link" @click.prevent="expandSubMenu($refs['subMenu' + index][0])">
          <svg class="icon-svg" aria-hidden="true"><use :xlink:href="'#if-' + route.meta.icon"></use></svg>
          <cite>{{ route.meta.title }}</cite>
          <i class="el-icon el-icon-arrow-up"></i>
        </a>
        <div class="menu-subs">
          <router-link class="subs-item" v-for="(sub) in route.children" :key="sub.path" :to="sub.path">
            {{ sub.meta.title }}
          </router-link>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'SidebarItems',
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    expandSubMenu(ref) {
      ref.classList[1] === 'expanded' ? ref.classList.remove('expanded') : ref.classList.add('expanded')
    }
  }
}
</script>
