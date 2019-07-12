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
import { mapState } from 'vuex'

const WIDTH = 992

export default {
  components: { VaSideMenu, VaHeadBar, VaTabsBar, VaFootBar, AppBody },
  computed: {
    ...mapState({
      sidebarOpened: state => state.application.sidebar.opened,
      device: state => state.application.device
    }),
    sidebarStatus() {
      const status = this.sidebarOpened ? 'expanded' : 'collapse'
      return `sidebar-${status}`
    }
  },
  watch: {
    $route() {
      // In mobile devices, auto close the sidebar when route jump.
      if (this.isMobile() && this.sidebarOpened) {
        this.closeSidebar()
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.dispatch('app_device_toggle', 'mobile')
      this.closeSidebar()
    }
  },
  methods: {
    isMobile() {
      return document.body.getBoundingClientRect().width <= WIDTH
    },
    resizeHandler() {
      if (document.hidden) {
        return
      }

      const isMobile = this.isMobile()

      this.$store.dispatch('app_device_toggle', isMobile ? 'mobile' : 'desktop')
      if (isMobile && this.sidebarOpened) {
        this.closeSidebar()
      }
    },
    closeSidebar() {
      this.$store.dispatch('app_sidebar_close')
    }
  }
}
</script>
