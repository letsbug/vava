<template>
  <div class="va-tabs-bar" :class="isMobile ? 'mobile' : ''">

    <breadcrumb v-if="isMobile"></breadcrumb>

    <template v-else>
      <!-- Closable tab control list -->
      <scroll-pane ref="scrollPane" class="tabs-scroll-pane">
        <router-link class="va-tabs-item" ref="tabs" v-if="!route.notab" :key="route.path"
                     v-for="route in history" :to="route.path"
                     @contextmenu.prevent.native="menuOpen(route, $event)">
          <span class="tabs-item-name">{{ route.title }}</span>
          <span class="tabs-item__close">
            <va-icon icon="action-close" @click.prevent.native="close(route)"></va-icon>
          </span>
        </router-link>
      </scroll-pane>

      <!-- Resident tab control, link to home -->
      <router-link class="va-tabs-item tabs-home" to="/home">
        <va-icon class="link-home" icon="thing-house"></va-icon>
      </router-link>

      <!-- TODO Add some tabs options or tabs out to here -->
      <el-dropdown class="tabs-more" trigger="click" @command="onOptionCommand">
        <a class="va-tabs-item">
          <i class="el-icon-arrow-down"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="close" :disabled="history.length < 1">Close</el-dropdown-item>
          <el-dropdown-item :command="closeOthers" :disabled="history.length < 2">Close Others</el-dropdown-item>
          <el-dropdown-item :command="closeAll" :disabled="history.length < 2">Close All</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- Closeable tabs context menu -->
      <ul ref="tabsContextMenu" class="va-context-menu" v-show="contextVisible"
          :style="{ left: this.left + 'px', top: this.top + 'px' }">
        <li class="context-menu-item" @click="close(selected)">Close</li>
        <li class="context-menu-item" @click="closeOthers(selected)">Close Others</li>
        <li class="context-menu-item" @click="closeAll">Close All</li>
      </ul>
    </template>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import Breadcrumb from '@/components/Breadcrumb/index'

export default {
  name: 'VaTabsBar',
  components: { ScrollPane, Breadcrumb },
  data() {
    return {
      contextVisible: false,
      left: 0,
      top: 0,
      selected: {}
    }
  },
  mounted() {
    this.add()
  },
  watch: {
    $route() {
      this.add()
      this.scrollToCurrentTab()
    },
    contextVisible(v) {
      if (v) document.body.addEventListener('click', this.menuClose)
      else document.body.removeEventListener('click', this.menuClose)
    }
  },
  computed: {
    history() { return this.$store.getters.tabs_history },
    isMobile() { return this.$store.getters.device === 'mobile' }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    scrollToCurrentTab() {
      const tabs = this.$refs['tabs']
      if (tabs && tabs.length > 0) this.$nextTick(() => {
        for (const tab of tabs) {
          if (tab.to === this.$route.path) {
            this.$refs['scrollPane'].scrollTo(tab.$el)
            break
          }
        }
      })
    },
    add() {
      if (this.isMobile) return
      const { name, path, meta } = this.$route
      if (meta.notab || !name || path === '/home') return
      this.$store.dispatch('tabs_add', this.$route)
    },
    close(target) {
      const _$route = this.$route
      if (!target) target = { name: _$route.name, path: _$route.path, title: _$route.meta.title }
      this.$store.dispatch('tabs_del', target).then(routes => {
        if (!this.isActive(target)) return
        const latest = routes.splice(-1)[0]
        this.$router.push({ path: latest ? latest.path : '/home' })
      })
    },
    closeOthers(target) {
      const _$route = this.$route
      if (!target) target = { name: _$route.name, path: _$route.path, title: _$route.meta.title }
      this.$router.push(this.selected)
      this.$store.dispatch('tabs_del_others', target).then(() => {
        // ...
      })
    },
    closeAll() {
      this.$store.dispatch('tabs_empty').then(() => {
        this.$router.push('/')
      })
    },
    menuOpen(tar, e) {
      this.selected = tar

      const width = 130
      const tabBarRect = this.$el.getBoundingClientRect()
      this.left = e.clientX - tabBarRect.left
      this.top = e.clientY - tabBarRect.top
      if ((tabBarRect.width - this.left) < width) this.left = this.left - width

      this.contextVisible = true
    },
    menuClose() {
      this.contextVisible = false
    },
    onOptionCommand(tar) {
      tar()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

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
