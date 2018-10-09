<template>
  <div class="va-tabs-bar" :class="isMobile ? 'mobile' : ''">
    <breadcrumb v-if="isMobile"></breadcrumb>
    <template v-else>
      <!-- Resident tab control, link to home -->
      <router-link class="tabs-item" to="/home"><va-icon class="link-home" icon="house"></va-icon></router-link>

      <!-- Closable tab control list -->
      <router-link class="tabs-item"
                   v-for="route in history"
                   v-if="!route.notab"
                   :key="route.path"
                   :to="route.path">
        <span class="tabs-item-name">{{ route.title }}</span>
        <span class="tabs-item__close"><va-icon icon="handle-close" @click.prevent.native="close(route)"></va-icon></span>
      </router-link>
    </template>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'

export default {
  name: 'VaTabsBar',
  components: { Breadcrumb },
  mounted() {
    this.add()
  },
  watch: {
    $route: 'add'
  },
  computed: {
    history() { return this.$store.getters.tabs_history },
    isMobile() { return this.$store.getters.device === 'mobile' }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.va-tabs-bar {

  &.mobile {
    padding: 0 $spacer-base;
  }

  .el-breadcrumb {
    height: $tabs-height;
    line-height: $tabs-height;
  }
}
</style>
