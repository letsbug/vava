<template>
  <div class="sidebar-menu">
    <template v-for="(route, index) in routes" v-if="!route.hidden">
      <router-link class="menu-item" v-if="route.children.length <= 1" :to="route.path + '/' + route.children[0].path">
        <svg class="icon-svg" aria-hidden="true"><use :xlink:href="'#if-' + route.children[0].meta.icon"></use></svg>
        <cite>{{ route.children[0].meta.title }}</cite>
      </router-link>
      <router-link class="menu-item" v-else to="/dashboard">
        <svg class="icon-svg" aria-hidden="true"><use xlink:href="#if-home"></use></svg>
        <cite>Dashboard</cite>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItems',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
