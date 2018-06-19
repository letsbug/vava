<template>
  <div class="app-header">
    <div class="header-nav nav-left">
      <a class="nav-item" @click.prevent="toggleSidebar"><svg class="icon-svg" aria-hidden="true"><use
        :xlink:href="sidebarOpend ? '#if-handle-close' : '#if-handle-expand'"></use></svg></a>
      <a class="nav-item open-in-browser"><svg class="icon-svg" aria-hidden="true"><use
        xlink:href="#if-handle-browse"></use></svg></a>
      <a class="nav-item" @click.prevent="handleRefresh"><svg class="icon-svg handle-refresh" aria-hidden="true"><use
        xlink:href="#if-handle-refresh-half"></use></svg></a>
    </div>
    <div class="header-forms">
      <el-input placeholder="搜索..." @keyup.enter.native="handleSearch">
        <i slot="suffix" class="el-input__icon el-icon-search" @click.prevent="handleSearch"></i>
      </el-input>
    </div>
    <div class="header-nav nav-right">
      <el-dropdown @command="handleCommand">
        <a class="nav-item link-user">
          <div class="avatar">
            <img :src="avatar" :alt="username">
          </div>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">帐号设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
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
    },
    handleSearch(e) {
      e.preventDefault()
      let el = e.target
      if (el.tagName !== 'INPUT') {
        el = el.parentNode.parentNode.parentNode.childNodes
        if (!el[0].tagName) el = el[1]
      }
      console.log('handle navigation bar search form! The input value is => \'' + el.value + '\'')
    },
    handleCommand(command) {
      switch (command) {
        case 'user': break;
        case 'setting': break;
        case 'logout':
          this.handleLogout()
          break
      }
    },
    handleLogout() {
      const _this = this
      _this.$confirm('确认退出当前账户？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$store.dispatch('user_logout').then(() => {
          location.reload()
        })
      }).catch(() => {})
    }
  }
}
</script>
