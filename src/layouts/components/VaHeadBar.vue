<template>
  <div class="va-head-bar clear-fix">
    <!-- left navs -->
    <div class="va-head-nav clear-fix">
      <a class="va-nav-item" @click.stop="toggleSidebar">
        <va-icon :icon="sidebarOpend ? 'handle-collapse' : 'handle-expand'"></va-icon>
      </a>
      <a class="va-nav-item hidden-xs-only">
        <va-icon icon="browser"></va-icon>
      </a>
      <a class="va-nav-item">
        <va-icon icon="refresh"></va-icon>
      </a>
    </div>

    <!-- nav forms -->
    <el-tooltip effect="dark" content="Input something and press enter for search" placement="bottom">
      <el-input class="nav-head-search hidden-xs-only" placeholder="search something..."
                @keyup.enter.native="handleSearch">
      </el-input>
    </el-tooltip>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">
      <el-tooltip effect="dark" content="you have unread notifications" placement="bottom">
        <router-link class="va-nav-item" to="/notifications">
          <el-badge is-dot>
            <va-icon icon="notice"></va-icon>
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
        <va-icon icon="more"></va-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaHeadBar',
  created() {
    this.getNotificationList()
  },
  computed: {
    sidebarOpend() { return this.$store.state.application.sidebar.opened },
    user() { return this.$store.state.user }
  },
  methods: {
    toggleSidebar() { this.$store.dispatch('app_sidebar_toggle') },
    handleSearch(el) {
      el = el.target
      console.log('handle navigation bar search form! The input value is => "' + el.value + '"')
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
      this.$confirm('Are you sure to exit the currently logged in account?', 'Log out', {
        type: 'warning',
        confirmButtonText: 'I\'m sure',
        cancelButtonText: 'Cancel'
      }).then(() => {
        this.$store.dispatch('user_logout').then(() => { location.reload() })
      }).catch(() => {})
    },
    getNotificationList() {
      this.$store.dispatch('notification_list')
    },
  }
}
</script>
