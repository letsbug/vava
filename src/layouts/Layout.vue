<template>
  <div class="app-wrapper" :class="sidebarOpend ? 'sidebar-expanded' : ''">
    <sidebar></sidebar>
    <div class="container-main" :class="device==='mobile'?'no-tab':''">
      <header-bar></header-bar>
      <tab-bar v-if="device!=='mobile'"></tab-bar>
      <app-body></app-body>
      <footer-bar></footer-bar>
    </div>
    <div class="sidebar-backdrop" @click.prevent="toggleSidebar"></div>
  </div>
</template>

<script>
import { Sidebar, HeaderBar, TabBar, AppBody, FooterBar } from './components'
import ResizeHandler from '@/utilities/ResizeHandler'

export default {
  name: 'Layout',
  components: { Sidebar, HeaderBar, TabBar, AppBody, FooterBar },
  mixins: [ResizeHandler],
  computed: {
    sidebarOpend() { return this.$store.state.application.sidebar.opened },
    device() { return this.$store.state.application.device }
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app_sidebar_toggle')
    }
  }
}
</script>
