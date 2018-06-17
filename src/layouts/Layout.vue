<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <div class="container-main">
      <header-bar></header-bar>
      <tab-bar></tab-bar>
      <app-main></app-main>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import { Sidebar, HeaderBar, TabBar, AppMain, FooterBar } from './components'
import ResizeHandler from '@/utilities/ResizeHandler'

export default {
  name: 'Layout',
  components: { Sidebar, HeaderBar, TabBar, AppMain, FooterBar },
  mixins: [ResizeHandler],
  computed: {}
}
</script>
