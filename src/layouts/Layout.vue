<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <header-bar></header-bar>
    <tab-bar></tab-bar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { Sidebar, HeaderBar, TabBar, AppMain, FooterBar } from './components/index'
import ResizeHandler from '@/utilities/ResizeHandler'

export default {
  name: 'Layout',
  components: { Sidebar, HeaderBar, TabBar, AppMain, FooterBar },
  mixins: [ResizeHandler],
  computed: {}
}
</script>
