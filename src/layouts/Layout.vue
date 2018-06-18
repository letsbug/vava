<template>
  <div class="app-wrapper" :class="sidebarOpend ? 'sidebar-expanded' : ''">
    <sidebar></sidebar>
    <div class="container-main">
      <header-bar></header-bar>
      <tab-bar></tab-bar>
      <app-main></app-main>
      <footer-bar></footer-bar>
    </div>
    <div class="sidebar-backdrop" @click.prevent="toggleSidebar"></div>
  </div>
</template>

<script>
import { Sidebar, HeaderBar, TabBar, AppMain, FooterBar } from './components'
import ResizeHandler from '@/utilities/ResizeHandler'

export default {
  name: 'Layout',
  components: { Sidebar, HeaderBar, TabBar, AppMain, FooterBar },
  mixins: [ResizeHandler],
  computed: {
    sidebarOpend() { return this.$store.state.application.sidebar.opened }
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app_toggle_sidebar')
    }
  }
}
</script>
