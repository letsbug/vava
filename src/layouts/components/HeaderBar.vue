<template>
  <div class="app-header">
    <div class="header-nav nav-left">
      <a class="nav-item" @click.prevent="toggleSidebar"><svg class="icon-svg" aria-hidden="true"><use
        v-bind:xlink:href="sidebarOpend ? '#if-handle-close' : '#if-handle-expand'"></use></svg></a>
      <a class="nav-item open-in-browser"><svg class="icon-svg" aria-hidden="true"><use
        xlink:href="#if-handle-browse"></use></svg></a>
      <a class="nav-item" @click.prevent="handleRefresh"><svg class="icon-svg handle-refresh" aria-hidden="true"><use
        xlink:href="#if-handle-refresh-half"></use></svg></a>
    </div>
    <div class="header-nav nav-right">
      <el-dropdown>
        <a class="nav-item link-user">
          <div class="avatar">
            <img :src="avatar" :alt="username">
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>帐号设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  computed: {
    sidebarOpend() { return this.$store.state.application.sidebar.opened },
    username() { return this.$store.state.user.username },
    avatar() { return this.$store.state.user.avatar }
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('app_toggle_sidebar')
    },
    handleRefresh(e) {
      let el = e.target
      if (el.tagName !== 'svg') el = (el.tagName === 'A') ? el.childNodes[0] : el.parentNode
      if (el.classList[2] === 'doing') return

      el.classList.add('doing')
      setTimeout(() => { el.classList.remove('doing') }, 6000)
      // location.reload()
    }
  }
}
</script>
