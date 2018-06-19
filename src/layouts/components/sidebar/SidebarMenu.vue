<template>
  <div class="sidebar-menu">
    <router-link class="menu-item" to="/dashboard">
      <svg class="icon-svg" aria-hidden="true"><use xlink:href="#if-home"></use></svg>
      <cite>Dashboard</cite>
    </router-link>
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
