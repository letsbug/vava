<template>
  <div class="va-tabs-bar" :class="isMobile ? 'mobile' : ''">
    <breadcrumb v-if="isMobile"></breadcrumb>
    <template v-else>

      <!-- Closable tab control list -->
      <scroll-pane ref="scrollPane" class="tabs-scroll-pane">
        <router-link class="tabs-item" ref="tabs"
                     v-for="route in history"
                     v-if="!route.notab"
                     :key="route.path"
                     :to="route.path"
                     @contextmenu.prevent.native="menuOpen(route, $event)">
          <span class="tabs-item-name">{{ route.title }}</span>
          <span class="tabs-item__close">
            <va-icon icon="handle-close" @click.prevent.native="close(route)"></va-icon>
          </span>
        </router-link>
      </scroll-pane>

      <!-- Resident tab control, link to home -->
      <router-link class="tabs-item tabs-home" to="/home">
        <va-icon class="link-home" icon="house"></va-icon>
      </router-link>

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
import ScrollPane from '@/components/ScrollPane'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'

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
    $route: 'add',
    contextVisible: 'listenerOnContOpened'
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
    },
    add() {
      if (this.isMobile) return
      const { name, path, meta } = this.$route
      if (meta.notab || !name || path === '/home') return
      this.$store.dispatch('tabs_add', this.$route)
    },
    close(target) {
      this.$store.dispatch('tabs_del', target).then(routes => {
        if (!this.isActive(target)) return
        const latest = routes.splice(-1)[0]
        this.$router.push({ path: latest ? latest.path : '/home' })
      })
    },
    closeOthers(tar) {
      this.$router.push(this.selected)
      this.$store.dispatch('tabs_del_others', tar).then(() => {
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
    listenerOnContOpened(v) {
      if (v) document.body.addEventListener('click', this.menuClose)
      else document.body.removeEventListener('click', this.menuClose)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

$tabs-home-width: 44px;

.va-tabs-bar {
  padding-left: $tabs-home-width;

  .tabs-scroll-pane {
    height: $tabs-height;
  }

  .tabs-home {
    width: $tabs-home-width;
    position: absolute;
    left: 0;
    top: 0;
  }

  &.mobile {
    padding: 0 $spacer-base;
  }

  .el-breadcrumb {
    height: $tabs-height;
    line-height: $tabs-height;
  }
}
</style>
