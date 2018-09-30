<template>
  <div class="va-tabs-bar">
    <!-- Resident tab control, link to home -->
    <router-link class="tabs-item" to="/home"><va-icon class="link-home" icon="house"></va-icon></router-link>

    <!-- Closable tab control list -->
    <router-link class="tabs-item" v-for="route in history" :key="route.path" :to="route.path">
      <span class="tabs-item-name">{{ route.title }}</span>
      <span class="tabs-item__close"><va-icon icon="handle-close" @click.prevent.native="close(route)"></va-icon></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'VaTabsBar',
  mounted() {
    this.add()
  },
  watch: {
    $route: 'add'
  },
  computed: {
    history() { return this.$store.getters.tabs_history }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    add() {
      const route = this.$route
      if (!route.name || route.path === '/home') return
      this.$store.dispatch('tabs_add', route)
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
