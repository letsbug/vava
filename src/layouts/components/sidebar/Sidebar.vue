<template>
  <div class="container-sidebar app-sidebar">
    <div class="app-brand">
      <img class="logo" :src="logo" alt="">
      <span class="title">Vue Admin</span>
    </div>
    <sidebar-menu :routes="permission_routes"></sidebar-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarMenu from './SidebarMenu'
export default {
  name: 'Sidebar',
  data() {
    return {
      logo: require('@/assets/images/logo.png')
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  components: { SidebarMenu }
}
</script>
