<template>
  <div class="app-tabbar">
    <router-link class="tabbar-item" to="/dashboard">
      <svg class="icon-svg"><use xlink:href="#if-home" aria-hidden="true"></use></svg>
    </router-link>
    <router-link class="tabbar-item" :key="route.path" v-for="route in Array.from(visited)" :to="route.path">
      {{ route.name }}
      <svg class="icon-svg icon-close"  @click.prevent="closeTab(route)"><use xlink:href="#if-close" aria-hidden="true"></use></svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  computed: {
    visited() {
      return this.$store.getters.tabs_visited
    }
  },
  watch: {
    $route() {
      this.addTab()
    }
  },
  mounted() {
    this.addTab()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    addTab() {
      const route = this.$route
      if (!route.name || route.path === '/dashboard') return
      this.$store.dispatch('tabs_add', route)
    },
    closeTab(route) {
      this.$store.dispatch('tabs_del', route).then(views => {
        if (this.isActive(route)) {
          const latest = views.splice(-1)[0]
          this.$router.push(latest ? latest.path : '/')
        }
      })
    }
  }
}
</script>
