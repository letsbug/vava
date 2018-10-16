<template>
  <div class="va-tabs-bar" :class="isMobile ? 'mobile' : ''">

    <breadcrumb v-if="isMobile"></breadcrumb>

    <template v-else>
      <!-- Closable tab control list -->
      <div ref="tabsPane" class="tabs-pane">
        <router-link class="va-tabs-item" ref="tabs" v-if="!route.notab" :key="route.path"
                     v-for="route in tabs" :to="route.path"
                     @contextmenu.prevent.native="menuOpen(route, $event)">
          <span class="tabs-item-name">{{ route.title }}</span>
          <span class="tabs-item__close">
            <va-icon icon="handle-close" @click.prevent.native="close(route)"></va-icon>
          </span>
        </router-link>
      </div>

      <!-- Resident tab control, link to home -->
      <router-link class="va-tabs-item tabs-home" to="/home">
        <va-icon class="link-home" icon="house"></va-icon>
      </router-link>

      <!-- TODO Add some tabs options or tabs out to here -->
      <el-dropdown class="tabs-more" trigger="click" @command="onClickOverflows" v-if="overflows.length > 0">
        <a class="va-tabs-item">
          <i class="el-icon-arrow-down"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in overflows" :key="item.path" :command="item">
            {{ item.title | capitalize }}
          </el-dropdown-item>
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
import Breadcrumb from '@/components/Breadcrumb/index'

export default {
  name: 'VaTabsBar',
  components: { Breadcrumb },
  data() {
    return {
      tabs: [],
      overflows: [],
      contextVisible: false,
      left: 0,
      top: 0,
      selected: {}
    }
  },
  mounted() {
    this.add()
    this.tabs = this.$store.getters.tabs_list
    this.overflows = this.$store.getters.tabs_overflows
  },
  watch: {
    $route() {
      this.add()
    },
    contextVisible(v) {
      if (v) document.body.addEventListener('click', this.menuClose)
      else document.body.removeEventListener('click', this.menuClose)
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device === 'mobile'
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    setTabsLayout() {
      console.log('Start set tabs layout.')
      const tabsPaneWidth = this.$refs['tabsPane'].getBoundingClientRect().width
      const tabs = this.$refs['tabs']
      let tabsWidth = 0
      for (const tab of tabs) {
        tabsWidth += tab.$el.getBoundingClientRect().width
      }
      if (tabsWidth > tabsPaneWidth) {
        console.log('tabs total width was more than tabs pane...')
      } else {
        console.log('tabs total width was less than tabs pane...')
      }
    },
    add() {
      if (this.isMobile) return
      const { name, path, meta } = this.$route
      if (meta.notab || !name || path === '/home') return
      this.$store.dispatch('tabs_add', this.$route).then(() => {
        this.setTabsLayout()
      })
    },
    close(target) {
      const _$route = this.$route
      if (!target) target = { name: _$route.name, path: _$route.path, title: _$route.meta.title }
      this.$store.dispatch('tabs_del', target).then(routes => {
        if (!this.isActive(target)) return
        const latest = routes.splice(-1)[0]
        this.$router.push({ path: latest ? latest.path : '/home' })
        this.setTabsLayout()
      })
    },
    closeOthers(target) {
      const _$route = this.$route
      if (!target) target = { name: _$route.name, path: _$route.path, title: _$route.meta.title }
      this.$router.push(this.selected)
      this.$store.dispatch('tabs_del_others', target).then(() => {
        this.setTabsLayout()
      })
    },
    closeAll() {
      this.$store.dispatch('tabs_empty').then(() => {
        this.$router.push('/')
        this.setTabsLayout()
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
    onClickOverflows(tar) {
      this.$router.push(tar)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.va-tabs-bar .tabs-pane {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}
</style>
