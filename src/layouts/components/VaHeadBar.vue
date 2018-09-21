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
    <el-tooltip class="item" effect="dark" content="Input something and press enter for search" placement="bottom">
      <el-input class="nav-head-search hidden-xs-only" placeholder="search something..."
                @keyup.enter.native="handleSearch">
      </el-input>
    </el-tooltip>

    <!-- right navs -->
    <div class="va-head-nav nav-right clear-fix">
      <a class="va-nav-item spacer-xs link-user">
        <img class="avatar" :src="user.avatar" alt="">
      </a>
      <a class="va-nav-item spacer-xs">
        <va-icon icon="more"></va-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaHeadBar',
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
  }
}
</script>
