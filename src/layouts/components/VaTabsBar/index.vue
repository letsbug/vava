<template>
  <div :class="isMobile ? 'mobile' : ''" class="va-tabs-bar">
    <!-- breadcrumb -->
    <Breadcrumb v-if="isMobile" />

    <template v-else>
      <!-- Resident tab control, link to home -->
      <RouterLink class="va-tabs-item tabs-home" to="/home">
        <VaIcon class="link-home" icon="thing-house" />
      </RouterLink>

      <!-- Closable tab control list -->
      <ScrollPane ref="scrollPane" class="tabs-scroll-pane">
        <template v-for="route in history">
          <RouterLink
            v-if="!route.notab" ref="tabs"
            :key="route.path" :to="route.path" class="va-tabs-item"
            @contextmenu.prevent.native="handleOpenContextMenu"
          >
            <span class="tabs-item-name">
              {{ generateTitle(route.title) }}
            </span>
            <span class="tabs-item__close">
              <VaIcon icon="action-close" @click.prevent.native="close(route)" />
            </span>
          </RouterLink>
        </template>
      </ScrollPane>

      <!-- Closeable tabs context menu -->
      <ContextMenu ref="tabsContext" :options="tabsOptions" class="tabs-context-menu" />

      <!-- Tabs options -->
      <ElDropdown class="tabs-more" trigger="click" @command="onOptionCommand">
        <a class="va-tabs-item">
          <i class="el-icon-arrow-down"></i>
        </a>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem :command="close" :disabled="history.length < 1">
            {{ $t('tabBar.close') }}
          </ElDropdownItem>
          <ElDropdownItem :command="closeOthers" :disabled="history.length < 2">
            {{ $t('tabBar.closeOthers') }}
          </ElDropdownItem>
          <ElDropdownItem :command="closeAll" :disabled="history.length < 2">
            {{ $t('tabBar.closeAll') }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </template>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import Breadcrumb from '@/components/Breadcrumb/index'
import ContextMenu from '@/components/ContextMenu'
import { generateTitle } from '@/tools/i18n'

export default {
  name: 'VaTabsBar',
  components: { ScrollPane, Breadcrumb, ContextMenu },
  data() {
    return {
      tabsOptions: [
        { name: this.$t('tabBar.close'), callback: this.close },
        { name: this.$t('tabBar.closeOthers'), callback: this.closeOthers },
        { name: this.$t('tabBar.closeAll'), callback: this.closeAll }
      ]
    }
  },
  computed: {
    history() { return this.$store.getters.tabs_history },
    isMobile() { return this.$store.getters.device === 'mobile' }
  },
  watch: {
    $route() {
      this.add()
      this.scrollToCurrentTab()
      this.handleReCalcContextStatus()
    }
  },
  mounted() {
    this.add()
    this.handleReCalcContextStatus()
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
    close() {
      const target = { name: this.$route.name, path: this.$route.path, title: this.$route.meta.title }
      this.$store.dispatch('tabs_del', target).then(routes => {
        if (!this.isActive(target)) return
        const latest = routes.splice(-1)[0]
        this.$router.push({ path: latest ? latest.path : '/home' })
      })
    },
    closeOthers() {
      const target = { name: this.$route.name, path: this.$route.path, title: this.$route.meta.title }
      this.$router.push(target)
      this.$store.dispatch('tabs_del_others', target)
    },
    closeAll() {
      this.$store.dispatch('tabs_empty').then(() => {
        this.$router.push('/')
      })
    },
    handleReCalcContextStatus() {
      const tabsLength = this.history.length
      this.$set(this.tabsOptions[0], 'disabled', tabsLength < 1)
      this.$set(this.tabsOptions[1], 'disabled', tabsLength < 2)
      this.$set(this.tabsOptions[2], 'disabled', tabsLength < 2)
    },
    handleOpenContextMenu($e) {
      this.$refs['tabsContext'].open($e)
    },
    onOptionCommand(tar) {
      tar()
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
