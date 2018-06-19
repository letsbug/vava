<template>
  <div class="container-sidebar app-sidebar">
    <div class="app-brand">
      <img class="logo" :src="logo" alt="">
      <span class="title">Vue Admin</span>
    </div>
    <sidebar-menu></sidebar-menu>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu'
export default {
  name: 'Sidebar',
  data() {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  components: { SidebarMenu }
}
</script>
