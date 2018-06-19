<template>
  <div class="sidebar-menu">
    <a class="menu-item" @click.prevent="test">
      <svg class="icon-svg" aria-hidden="true"><use xlink:href="#if-home"></use></svg>
      <cite>Dashboard</cite>
    </a>
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
