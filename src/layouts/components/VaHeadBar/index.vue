<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">
      <!-- sidebar expander -->
      <a class="va-nav-item" @click.stop="toggleSidebar">
        <VaIcon :icon="sidebarOpend ? 'action-collapse' : 'action-expand'" />
      </a>

      <!-- refresh button -->
      <RouterRefresh v-if="isMobile" />

      <!-- breadcrumb in desktop -->
      <Breadcrumb v-if="!isMobile" />
    </div>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">
      <!-- global search -->
      <a v-if="!isMobile" class="va-nav-item nav-search">
        <VaIcon icon="action-search" />
        <!-- TODO Add mobile layout to here -->
        <!-- TODO Add the history search drop-down list to here to autocomplete -->
        <input
          ref="globalSearch" v-model="search.keyword" :class="currRouteIsSearch" :placeholder="$t('header.search')"
          title class="nav-search-inner" autocomplete="on"
          @click="handleSearch" @keyup.enter="handleSearch"
        />
      </a>

      <template v-if="!isMobile">
        <!-- refresh button -->
        <RouterRefresh />
        <!-- full screen action -->
        <ScreenFull />
        <!-- theme selector -->
        <ThemePicker />
      </template>

      <LanguagePicker class="va-nav-item" />

      <!-- user notifications -->
      <ElTooltip :content="notificationTips" effect="dark" placement="bottom">
        <RouterLink class="va-nav-item" to="/notification">
          <ElBadge :hidden="!notificationHasUnread" is-dot>
            <VaIcon icon="mark-notice" />
          </ElBadge>
        </RouterLink>
      </ElTooltip>

      <!-- user actions -->
      <UserActions />

      <a class="va-nav-item hidden-sm-and-up">
        <VaIcon icon="mark-more" />
      </a>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import RouterRefresh from '@/components/RouterRefresh'
import ScreenFull from '@/components/ScreenFull'
import LanguagePicker from '@/components/LanguagePicker'
import ThemePicker from './ThemePicker'
import UserActions from './UserActions'

export default {
  name: 'VaHeadBar',
  components: { Breadcrumb, RouterRefresh, ScreenFull, LanguagePicker, ThemePicker, UserActions },
  data() {
    return {
      search: { old: '', keyword: '' }
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device === 'mobile'
    },
    sidebarOpend() {
      return this.$store.state.application.sidebar.opened
    },
    currRouteIsSearch() {
      return /^\/search/.test(this.$route.path) ? 'active' : ''
    },
    notificationHasUnread() {
      return this.$store.state.notification.hasUnread
    },
    notificationTips() {
      return this.$t(`header.notification${this.notificationHasUnread ? 'Has' : 'No'}`)
    }
  },
  created() {
    this.$store.dispatch('notification_list')
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app_sidebar_toggle')
    },
    handleSearch() {
      const old = this.search.old
      const key = this.search.keyword
      if (!key || (key === old)) return
      this.search.old = key
      this.$router.push(`/search/${key}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

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
