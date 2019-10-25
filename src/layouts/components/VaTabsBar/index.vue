import { DeviceType } from '@/store/modules/system'
<template>
  <div class="va-tabs-bar">
    <!-- breadcrumb -->
    <breadcrumb v-if="isMobile" />

    <template v-else>
      <!-- Resident tab control, link to home -->
      <router-link class="va-tabs-item tabs-home" to="/home">
        <va-icon class="link-home" icon="thing-house" />
      </router-link>

      <!-- Closable tab control list -->
      <scroll-pane ref="scrollPane" class="tabs-scroll-pane">
        <template v-for="route in history">
          <router-link
            v-if="!route.notab"
            ref="tabs"
            :key="route.path"
            :to="route.path"
            class="va-tabs-item"
            @contextmenu.prevent.native="openContextMenu($event, route)"
          >
            <span class="tabs-item-name">
              {{ generateTitle(route.title) }}
            </span>
            <span class="tabs-item__close">
              <va-icon icon="action-close" @click.prevent.native="close(route)" />
            </span>
          </router-link>
        </template>
      </scroll-pane>

      <!-- Closeable tabs context menu -->
      <context-menu ref="tabsContext" :options="tabsOptions" :target="selectedTab" class="tabs-context-menu" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { DeviceType, IStoreSystem } from '@/store/modules/system';
import { IStoreTabs } from '@/store/modules/tabs';
import { generateTitle } from '@/i18n';
import { Breadcrumb, ContextMenu } from '@/components';
import ScrollPane from './ScrollPane.vue';
import { Route, RouteConfig, RouteRecord } from 'vue-router';
import { VueRouter } from 'vue-router/types/router';

@Component({ name: 'VaTabsBar', components: { ScrollPane, Breadcrumb, ContextMenu } })
export default class extends Vue {
  tabsOptions: any[] = [];
  selectedTab: any = {};

  get history() {
    return IStoreTabs.history;
  }
  get isMobile() {
    return IStoreSystem.device === DeviceType.Mobile;
  }

  @Watch('$route')
  onRouteChange() {
    this.add();
    this.scrollToCurrentTab();
    this.reCalcContextStatus();
  }

  mounted() {
    this.tabsOptions = [
      { name: this.$t('tabBar.close'), callback: this.close },
      { name: this.$t('tabBar.closeOthers'), callback: this.closeOthers },
      { name: this.$t('tabBar.closeAll'), callback: this.closeAll }
    ];
    this.add();
    this.reCalcContextStatus();
  }

  isActive(route: RouteConfig) {
    return route.path === this.$route.path;
  }

  generateTitle = generateTitle;

  scrollToCurrentTab() {
    const tabs = this.$refs['tabs'] as any[];
    if (tabs && tabs.length > 0) {
      this.$nextTick(() => {
        for (const tab of tabs) {
          if (tab.to === this.$route.path) {
            (this.$refs['scrollPane'] as HTMLElement).scrollTo(tab['$el']);
            break;
          }
        }
      });
    }
  }

  add() {
    if (this.isMobile) return;
    const { name, path, meta } = this.$route;
    if (meta.notab || !name || path === '/home') return;
    IStoreTabs.Add(this.$route);
  }

  close(target: RouteConfig) {
    if (!target) throw new Error('Unknown target tabs which you want to close.');
    IStoreTabs.Remove(target);
    if (!this.isActive(target)) return;
    // TODO fix bugs there
    // const latest = routes.splice(-1)[0];
    // this.$router.push({ path: latest ? latest.path : '/home' });
  }

  closeOthers(target: RouteConfig) {
    if (!target) throw new Error('Unknown target tabs which you want to not close.');
    this.$router.push(target);
    IStoreTabs.RemoveOthers(target);
  }

  closeAll() {
    IStoreTabs.Empty();
    this.$router.push('/');
  }

  reCalcContextStatus() {
    const tabsLength = this.history.length;
    this.$set(this.tabsOptions[0], 'disabled', tabsLength < 1);
    this.$set(this.tabsOptions[1], 'disabled', tabsLength < 2);
    this.$set(this.tabsOptions[2], 'disabled', tabsLength < 2);
  }

  openContextMenu($e: MouseEvent, tar: RouteConfig) {
    (this.$refs['tabsContext'] as any).open($e);
    this.selectedTab = tar;
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.va-tabs-bar /deep/ .va-scroll-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  .el-scrollbar__wrap {
    height: $tabs-height + 23px;
  }

  .el-scrollbar__view {
    display: inline-block;
    font-size: 1rem;
  }
}
</style>
