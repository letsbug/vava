<template>
  <div class="container-sidebar app-sidebar">
    <sidebar-items></sidebar-items>
  </div>
</template>

<script>
import SidebarItems from './SidebarItems'
export default {
  name: 'Sidebar',
  components: { SidebarItems }
}
</script>
