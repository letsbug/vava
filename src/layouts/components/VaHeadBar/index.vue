<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">

      <!-- sidebar expander -->
      <a class="va-nav-item" @click.stop="toggleSidebar">
        <va-icon :icon="sidebarOpend ? 'action-collapse' : 'action-expand'"/>
      </a>

      <!-- refresh button -->
      <router-refresh v-if="isMobile"/>

      <!-- breadcrumb in desktop -->
      <breadcrumb v-if="!isMobile"/>
    </div>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">

      <!-- global search -->
      <a v-if="!isMobile" class="va-nav-item nav-search">
        <va-icon icon="action-search"/>
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
        <router-refresh/>
        <!-- full screen action -->
        <screen-full/>
        <!-- theme selector -->
        <theme-picker/>
      </template>

      <language-picker class="va-nav-item"/>

      <!-- user notifications -->
      <el-tooltip :content="notificationTips" effect="dark" placement="bottom">
        <router-link class="va-nav-item" to="/notification">
          <el-badge :hidden="!notificationHasUnread" is-dot>
            <va-icon icon="mark-notice"/>
          </el-badge>
        </router-link>
      </el-tooltip>

      <!-- user actions -->
      <el-dropdown :show-timeout="100" trigger="click" style="float: left;" @command="userDropdown">
        <a class="va-nav-item spacer-xs link-user">
          <img :src="user.avatar" alt="" class="avatar"/>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="handleUserInfo">{{ $t('header.profile') }}</el-dropdown-item>
          <el-dropdown-item :command="handleSettings">{{ $t('header.settings') }}</el-dropdown-item>
          <el-dropdown-item :command="handleLogout" divided>{{ $t('header.logout.title') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a class="va-nav-item hidden-sm-and-up">
        <va-icon icon="mark-more"/>
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

export default {
  name: 'VaHeadBar',
  components: { Breadcrumb, RouterRefresh, ScreenFull, LanguagePicker, ThemePicker },
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
    user() {
      return this.$store.state.user
    },
    notificationHasUnread() {
      return this.$store.state.notification.hasUnread
    },
    notificationTips() {
      return this.$t(`header.notification${this.notificationHasUnread ? 'Has' : 'No'}`)
      // return 'you have ' + (this.notificationHasUnread ? '' : 'no') + ' unread notifications'
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
      this.$confirm(this.$t('header.logout.confirm'), this.$t('options.confirm.title'), {
        type: 'warning',
        confirmButtonText: this.$t('header.logout.button'),
        // cancelButtonText: 'Cancel',
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
