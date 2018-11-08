<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">

      <!-- sidebar expander -->
      <a class="va-nav-item" @click.stop="toggleSidebar">
        <va-icon :icon="sidebarOpend ? 'handle-collapse' : 'handle-expand'"/>
      </a>

      <!-- refresh button -->
      <refresh v-if="isMobile"></refresh>

      <!-- breadcrumb in desktop -->
      <breadcrumb v-if="!isMobile"></breadcrumb>
    </div>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">

      <!-- global search -->
      <a class="va-nav-item nav-search" v-if="!isMobile">
        <va-icon icon="search"/>
        <!-- TODO Add mobile layout to here -->
        <input ref="globalSearch" class="nav-search-inner" placeholder="search something..." autocomplete="on"
               :class="currRouteIsSearch"
               v-model="search.keyword"
               @click="handleSearch"
               @keyup.enter="handleSearch"/>
        <!-- TODO Add the history search drop-down list to here to autocomplete -->
      </a>

      <template v-if="!isMobile">
        <!-- refresh button -->
        <refresh></refresh>

        <!-- full screen action -->
        <screen-full></screen-full>

        <!-- theme selector -->
        <theme-selector></theme-selector>
      </template>

      <!-- user notifications -->
      <el-tooltip effect="dark" :content="notificationTips" placement="bottom">
        <router-link class="va-nav-item" to="/notifications">
          <el-badge is-dot :hidden="!notificationHasUnread">
            <va-icon icon="notice"/>
          </el-badge>
        </router-link>
      </el-tooltip>

      <!-- user actions -->
      <el-dropdown trigger="click" @command="userDropdown" :show-timeout="100" style="float: left;">
        <a class="va-nav-item spacer-xs link-user">
          <img class="avatar" :src="user.avatar" alt="">
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="handleUserInfo">Profile</el-dropdown-item>
          <el-dropdown-item :command="handleSettings">Settings</el-dropdown-item>
          <el-dropdown-item :command="handleLogout" divided>Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a class="va-nav-item hidden-sm-and-up">
        <va-icon icon="more"/>
      </a>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Refresh from './Refresh'
import ScreenFull from '@/components/ScreenFull'
import ThemeSelector from './ThemeSelector'

export default {
  name: 'VaHeadBar',
  components: { Breadcrumb, Refresh, ScreenFull, ThemeSelector },
  data() {
    return {
      search: { old: '', keyword: '' }
    }
  },
  created() {
    this.$store.dispatch('notification_list')
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
    user() {
      return this.$store.state.user
    },
    notificationHasUnread() {
      return this.$store.state.notification.hasUnread
    },
    notificationTips() {
      return 'you have ' + (this.notificationHasUnread ? '' : 'no ') + 'unread notifications'
    }
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
    },
    userDropdown(target) {
      target()
    },
    handleUserInfo() {
      // TODO build user information route
      console.log('clicked user info')
    },
    handleSettings() {
      // TODO build user settings route
    },
    handleLogout() {
      this.$confirm('Exit the currently logged in account?', 'Are you sure?', {
        type: 'warning',
        confirmButtonText: 'Sure Exit',
        cancelButtonText: 'Cancel',
        callback: action => {
          if (action === 'confirm') this.$store.dispatch('user_logout').then(() => { location.reload() })
        }
      })
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
