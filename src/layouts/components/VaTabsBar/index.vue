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
      <i-tab-scroll-pane ref="scrollPane" class="tabs-scroll-pane">
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
              {{ generateTitle(route.meta.title) }}
            </span>
            <span class="tabs-item__close">
              <va-icon icon="action-close" @click.prevent.native="close(route)" />
            </span>
          </router-link>
        </template>
      </i-tab-scroll-pane>

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
import ITabScrollPane from './ScrollPane.vue';
import { Route, RouteConfig, RouteRecord } from 'vue-router';
import { VueRouter } from 'vue-router/types/router';
import { IContextOptions } from '@/components';

@Component({ name: 'VaTabsBar', components: { ITabScrollPane, Breadcrumb, ContextMenu } })
export default class extends Vue {
  private tabsOptions: IContextOptions[] = [];
  private selectedTab: any = {};

  private get history() {
    return IStoreTabs.history;
  }
  private get isMobile() {
    return IStoreSystem.device === DeviceType.Mobile;
  }

  @Watch('$route')
  private onRouteChange() {
    this.add();
    this.scrollToCurrentTab();
    this.reCalcContextStatus();
  }

  mounted() {
    this.tabsOptions = [
      { label: this.$t('tabBar.close') as string, command: this.close },
      { label: this.$t('tabBar.closeOthers') as string, command: this.closeOthers },
      { label: this.$t('tabBar.closeAll') as string, command: this.closeAll }
    ];
    this.add();
    this.reCalcContextStatus();
  }

  private isActive(route: RouteConfig) {
    return route.path === this.$route.path;
  }

  private generateTitle = generateTitle;

  private scrollToCurrentTab() {
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

  private add() {
    if (this.isMobile) return;
    const { name, path, meta } = this.$route;
    if (meta.notab || !name || path === '/home') return;
    IStoreTabs.Add(this.$route);
  }

  private async close(target: RouteConfig) {
    if (!target) throw new Error('Unknown target tabs which you want to close.');
    await IStoreTabs.Remove(target);
    if (!this.isActive(target)) {
      return;
    }
    const routes = [...IStoreTabs.history];
    const latest = routes.splice(-1)[0];
    await this.$router.push({ path: latest ? latest.path : '/home' });
  }

  private closeOthers(target: RouteConfig) {
    if (!target) throw new Error('Unknown target tabs which you want to not close.');
    this.$router.push(target);
    IStoreTabs.RemoveOthers(target);
  }

  private closeAll() {
    IStoreTabs.Empty();
    this.$router.push('/');
  }

  private reCalcContextStatus() {
    const tabsLength = this.history.length;
    this.$set(this.tabsOptions[0], 'disabled', tabsLength < 1);
    this.$set(this.tabsOptions[1], 'disabled', tabsLength < 2);
    this.$set(this.tabsOptions[2], 'disabled', tabsLength < 2);
  }

  private openContextMenu($e: MouseEvent, tar: RouteConfig) {
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
