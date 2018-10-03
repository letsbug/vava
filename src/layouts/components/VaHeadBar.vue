<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">
      <a class="va-nav-item" @click.stop="toggleSidebar">
        <va-icon :icon="sidebarOpend ? 'handle-collapse' : 'handle-expand'"/>
      </a>
      <a class="va-nav-item hidden-xs-only">
        <va-icon icon="browser"/>
      </a>
      <a class="va-nav-item">
        <va-icon icon="refresh"/>
      </a>
    </div>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">
      <a class="va-nav-item nav-search">
        <va-icon icon="search"/>
        <input ref="globalSearch" class="nav-search-inner" placeholder="search something..." autocomplete="on"
               :class="currRouteIsSearch"
               v-model="search.keyword"
               @click="handleSearch"
               @keyup.enter="handleSearch"/>
        <!-- TODO Add the history search drop-down list to here to autocomplete -->
      </a>
      <el-tooltip effect="dark" content="you have unread notifications" placement="bottom">
        <router-link class="va-nav-item" to="/notifications">
          <el-badge is-dot :hidden="!notificationHasUnread">
            <va-icon icon="notice"/>
          </el-badge>
        </router-link>
      </el-tooltip>
      <a class="va-nav-item hidden-xs-only">
        <va-icon icon="theme"></va-icon>
      </a>
      <el-dropdown @command="userDropdown" :show-timeout="100" style="float: left;">
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
export default {
  name: 'VaHeadBar',
  data() {
    return {
      search: {
        old: '',
        keyword: ''
      }
    }
  },
  created() {
    this.$store.dispatch('notification_list')
  },
  computed: {
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
      console.log('start search')
      this.$router.push({
        path: '/search',
        query: { keyword: key }
      })
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
