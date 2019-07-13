<template>
  <div class="va-tabs-bar">
    <!-- breadcrumb -->
    <breadcrumb v-if="isMobile" />

    <template v-else>
      <!-- Resident tab control, link to home -->
      <router-link class="va-tabs-item tabs-home" to="/home">
        <va-icon class="link-home" icon="thing-house" />
      </router-link>

      <!-- Closable tab control list -->
      <scroll-pane ref="scrollPane" class="tabs-scroll-pane">
        <template v-for="route in history">
          <router-link
            v-if="!route.notab" ref="tabs"
            :key="route.path" :to="route.path" class="va-tabs-item"
            @contextmenu.prevent.native="openContextMenu($event, route)"
          >
            <span class="tabs-item-name">
              {{ generateTitle(route.title) }}
            </span>
            <span class="tabs-item__close">
              <va-icon icon="action-close" @click.prevent.native="close(route)" />
            </span>
          </router-link>
        </template>
      </scroll-pane>

      <!-- Closeable tabs context menu -->
      <context-menu ref="tabsContext" :options="tabsOptions" :target="selectedTab" class="tabs-context-menu" />
    </template>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import { Breadcrumb, ContextMenu } from '@/components'
import { mapState } from 'vuex'
import { generateTitle } from '@/i18n'

export default {
  components: { ScrollPane, Breadcrumb, ContextMenu },
  data() {
    return {
      tabsOptions: [
        { name: this.$t('tabBar.close'), callback: this.close },
        { name: this.$t('tabBar.closeOthers'), callback: this.closeOthers },
        { name: this.$t('tabBar.closeAll'), callback: this.closeAll }
      ],
      selectedTab: {}
    }
  },
  computed: {
    ...mapState({
      history: state => state.tabs.history,
      isMobile: state => state.application.device === 'mobile'
    })
  },
  watch: {
    $route() {
      this.add()
      this.scrollToCurrentTab()
      this.reCalcContextStatus()
    }
  },
  mounted() {
    this.add()
    this.reCalcContextStatus()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    scrollToCurrentTab() {
      const tabs = this.$refs['tabs']
      if (tabs && tabs.length > 0) {
        this.$nextTick(() => {
          for (const tab of tabs) {
            if (tab.to === this.$route.path) {
              this.$refs['scrollPane'].scrollTo(tab['$el'])
              break
            }
          }
        })
      }
    },
    add() {
      if (this.isMobile) return
      const { name, path, meta } = this.$route
      if (meta.notab || !name || path === '/home') return
      this.$store.dispatch('tabs_add', this.$route)
    },
    close(target) {
      if (!target) throw new Error('Unknown target tabs which you want to close.')
      this.$store.dispatch('tabs_del', target).then(routes => {
        if (!this.isActive(target)) return
        const latest = routes.splice(-1)[0]
        this.$router.push({ path: latest ? latest.path : '/home' })
      })
    },
    closeOthers(target) {
      if (!target) throw new Error('Unknown target tabs which you want to not close.')
      this.$router.push(target)
      this.$store.dispatch('tabs_del_others', target)
    },
    closeAll() {
      this.$store.dispatch('tabs_empty').then(() => {
        this.$router.push('/')
      })
    },
    reCalcContextStatus() {
      const tabsLength = this.history.length
      this.$set(this.tabsOptions[0], 'disabled', tabsLength < 1)
      this.$set(this.tabsOptions[1], 'disabled', tabsLength < 2)
      this.$set(this.tabsOptions[2], 'disabled', tabsLength < 2)
    },
    openContextMenu($e, tar) {
      this.$refs['tabsContext'].open($e)
      this.selectedTab = tar
    },
    generateTitle
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
