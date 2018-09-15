<template>
  <div class="va-app-wrapper" :class="device + ' ' + sidebarStatus">
    <va-side-bar></va-side-bar>
    <div class="va-main-wrapper">
      <va-head-bar></va-head-bar>
      <va-tabs-bar></va-tabs-bar>
      <app-body></app-body>
      <va-foot-bar></va-foot-bar>
    </div>
    <div class="va-side-backdrop" @click.prevent="closeSidebar"></div>
  </div>
</template>

<script>
import { VaSideBar, VaHeadBar, VaTabsBar, VaFootBar,Breadcrumb,  AppBody } from './components'

const { body } = document
const WIDTH = 768

export default {
  name: 'Layout',
  components: { VaSideBar, VaHeadBar, VaTabsBar, VaFootBar, Breadcrumb, AppBody },
  watch: {
    $route() {
      // In mobile devices, auto close the sidebar when route jump.
      if (this.isMobile() && this.sidebarOpened) {
        this.$store.dispatch('app_sidebar_close')
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.$store.dispatch('app_device_toggle', 'mobile')
    }
  },
  computed: {
    sidebarOpened() { return this.$store.state.application.sidebar.opened },
    sidebarStatus() { return 'sidebar-' + (this.sidebarOpened ? 'expanded' : 'collapse') },
    device() { return this.$store.state.application.device }
  },
  methods: {
    toggleDevice() { this.device = this.device === 'desktop' ? 'mobile' : 'desktop' },
    closeSidebar() { this.$store.dispatch('app_sidebar_close') },
    isMobile:() => body.getBoundingClientRect().width <= WIDTH,
    resizeHandler() {
      const isMobile = this.isMobile()
      this.$store.dispatch('app_device_toggle', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        this.$store.dispatch('app_sidebar_close')
      }
      // else store.dispatch('app_sidebar_open')
    }
  }
}
</script>

<style scoped>

</style>
