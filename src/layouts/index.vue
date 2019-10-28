<template>
  <div :class="device + ' ' + sidebarStatus" class="va-app-wrapper">
    <va-side-menu />
    <div class="va-main-wrapper">
      <va-head-bar />
      <va-tabs-bar />
      <va-main />
      <va-foot-bar />
    </div>
    <div class="va-side-backdrop" @click.prevent="IStoreSystem.CloseSidebar()"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VaSideMenu from './components/VaSideMenu/index.vue';
import VaHeadBar from './components/VaHeadBar/index.vue';
import VaTabsBar from './components/VaTabsBar/index.vue';
import VaFootBar from './components/VaFootBar.vue';
import VaMain from './components/VaMain.vue';
import { DeviceType, IStoreSystem } from '@/store/modules/system';
import { RouteConfig } from 'vue-router';

const WIDTH = 992;

@Component({ name: 'Layout', components: { VaSideMenu, VaHeadBar, VaTabsBar, VaFootBar, VaMain } })
export default class extends Vue {
  private get sidebarOpened() {
    return IStoreSystem.sidebar.opened;
  }

  private get sidebarStatus() {
    return `sidebar-${this.sidebarOpened ? 'expanded' : 'collapse'}`;
  }

  private get device() {
    return IStoreSystem.device;
  }

  @Watch('$route', { immediate: true })
  private onRouteChange() {
    if (this.isMobile() && this.sidebarOpened) {
      IStoreSystem.CloseSidebar();
    }
  }

  mounted() {
    if (this.isMobile()) {
      IStoreSystem.ToggleDevice(DeviceType.Mobile);
      IStoreSystem.CloseSidebar();
    }
    window.addEventListener('resize', this.resizeHandler);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private isMobile() {
    return document.body.getBoundingClientRect().width <= WIDTH;
  }

  private resizeHandler() {
    if (document.hidden) {
      return;
    }

    const isMobile = this.isMobile();

    IStoreSystem.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
    if (isMobile && this.sidebarOpened) {
      IStoreSystem.CloseSidebar();
    }
  }
}
</script>
