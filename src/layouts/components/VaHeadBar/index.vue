<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">
      <!-- sidebar expander -->
      <a id="hamburger" class="va-nav-item" @click.stop="toggleSidebar">
        <va-icon :icon="sidebarOpened ? 'action-collapse' : 'action-expand'" />
      </a>

      <!-- refresh button -->
      <router-refresh v-if="isMobile" />

      <!-- breadcrumb in desktop -->
      <breadcrumb v-if="!isMobile" />
    </div>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">
      <!-- global search -->
      <a v-if="!isMobile" class="va-nav-item nav-search">
        <va-icon icon="action-search" />
        <!-- TODO Add mobile layout to here -->
        <!-- TODO Add the history search drop-down list to here to autocomplete -->
        <input
          ref="globalSearch"
          v-model="search.keyword"
          :class="currRouteIsSearch"
          :placeholder="$t('header.search')"
          title
          class="nav-search-inner"
          autocomplete="on"
          @click="handleSearch"
          @keyup.enter="handleSearch"
        />
      </a>

      <template v-if="!isMobile">
        <!-- refresh button -->
        <router-refresh />
        <!-- full screen action -->
        <screen-full />
        <!-- theme selector -->
        <theme-picker />
      </template>

      <language-picker class-name="va-nav-item" class="float-l" />

      <!-- user notifications -->
      <el-tooltip :content="notificationTips" effect="dark" placement="bottom">
        <router-link class="va-nav-item" to="/notification">
          <el-badge :hidden="!notificationHasUnread" is-dot>
            <va-icon icon="mark-notice" />
          </el-badge>
        </router-link>
      </el-tooltip>

      <!-- user actions -->
      <user-actions />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Breadcrumb, RouterRefresh, ScreenFull, LanguagePicker, ThemePicker } from '@/components';
import UserActions from './UserActions.vue';
import { IStoreSystem } from '@/store/modules/system';
import { IStoreNotification } from '@/store/modules/notification';

@Component({
  name: 'VaHeadBar',
  components: { Breadcrumb, RouterRefresh, ScreenFull, LanguagePicker, ThemePicker, UserActions }
})
export default class extends Vue {
  private search = { old: '', keyword: '' };
  private page: number = 1;
  private limit: number = 20;

  get isMobile() {
    return IStoreSystem.device === 0;
  }

  get sidebarOpened() {
    return IStoreSystem.sidebar.opened;
  }

  get currRouteIsSearch() {
    return /^\/search/.test(this.$route.path) ? 'active' : '';
  }

  get notificationHasUnread() {
    return IStoreNotification.unread > 0;
  }

  get notificationTips() {
    return this.$t(`header.notification${this.notificationHasUnread ? 'Has' : 'No'}`);
  }

  mounted() {
    IStoreNotification.GetNotifications({ page: this.page, limit: this.limit });
  }

  toggleSidebar() {
    IStoreSystem.ToggleSidebar();
  }

  handleSearch() {
    const old = this.search.old;
    const key = this.search.keyword;
    if (!key || key === old) return;
    this.search.old = key;
    this.$router.push(`/search/${key}`);
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.va-head-nav .el-breadcrumb {
  float: left;
  height: $head-line-height;
  line-height: $head-line-height;
  padding-left: $head-nav-item-spacer;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: $spacer-sm;
    bottom: $spacer-sm;
    width: 1px;
    border-left: solid $border-default-width $color-gray-400;
    border-right: solid $border-default-width $color-gray-200;
  }
}
</style>
