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
import { VaSideBar, VaHeadBar, VaTabsBar, VaFootBar,  AppBody } from './components'

const { body } = document
const WIDTH = 768

export default {
  name: 'Layout',
  components: { VaSideBar, VaHeadBar, VaTabsBar, VaFootBar, AppBody },
  watch: {
    $route: 'SidebarAutoCloseInMobile'
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.dispatch('app_device_toggle', 'mobile')
    }
  },
  computed: {
    sidebarOpened() { return this.$store.state.application.sidebar.opened },
    sidebarStatus() { return 'sidebar-' + (this.sidebarOpened ? 'expanded' : 'collapse') },
    device() { return this.$store.state.application.device }
  },
  methods: {
    isMobile() {
      return body.getBoundingClientRect().width <= WIDTH
    },
    resizeHandler() {
      const isMobile = this.isMobile()
      this.$store.dispatch('app_device_toggle', isMobile ? 'mobile' : 'desktop')

      // Auto close sidebar when user resize window to mobile
      if (isMobile) this.$store.dispatch('app_sidebar_close')
      // else store.dispatch('app_sidebar_open')
    },
    toggleDevice() {
      this.device = this.device === 'desktop' ? 'mobile' : 'desktop'
    },
    closeSidebar() {
      this.$store.dispatch('app_sidebar_close')
    },
    SidebarAutoCloseInMobile() {
      // In mobile devices, auto close the sidebar when route jump.
      if (this.isMobile() && this.sidebarOpened) this.closeSidebar()
    }
  }
}
</script>
