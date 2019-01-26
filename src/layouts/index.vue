<template>
  <div :class="device + ' ' + sidebarStatus" class="va-app-wrapper">
    <va-side-menu />
    <div class="va-main-wrapper">
      <va-head-bar />
      <va-tabs-bar />
      <app-body />
      <va-foot-bar />
    </div>
    <div class="va-side-backdrop" @click.prevent="closeSidebar"></div>
  </div>
</template>

<script>
import { VaSideMenu, VaHeadBar, VaTabsBar, VaFootBar, AppBody } from './components'

const WIDTH = 992

export default {
  components: { VaSideMenu, VaHeadBar, VaTabsBar, VaFootBar, AppBody },
  computed: {
    sidebarOpened() { return this.$store.state.application.sidebar.opened },
    sidebarStatus() { return 'sidebar-' + (this.sidebarOpened ? 'expanded' : 'collapse') },
    device() { return this.$store.state.application.device }
  },
  watch: {
    $route: 'sidebarCloseInMobile'
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.dispatch('app_device_toggle', 'mobile')
    }
  },
  methods: {
    isMobile() {
      return document.body.getBoundingClientRect().width <= WIDTH
    },
    resizeHandler() {
      const isMobile = this.isMobile()
      this.$store.dispatch('app_device_toggle', isMobile ? 'mobile' : 'desktop')
      if (isMobile && this.sidebarOpened) this.$store.dispatch('app_sidebar_close')
    },
    toggleDevice() {
      this.device = this.device === 'desktop' ? 'mobile' : 'desktop'
    },
    closeSidebar() {
      this.$store.dispatch('app_sidebar_close')
    },
    sidebarCloseInMobile() {
      // In mobile devices, auto close the sidebar when route jump.
      if (this.isMobile() && this.sidebarOpened) this.closeSidebar()
    }
  }
}
</script>
