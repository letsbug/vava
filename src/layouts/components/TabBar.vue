<template>
  <div class="app-tabbar">
    <router-link class="tabbar-item" to="/dashboard">
      <svg class="icon-svg"><use xlink:href="#if-home" aria-hidden="true"></use></svg>
    </router-link>
    <router-link class="tabbar-item" :key="route.path" v-for="route in Array.from(visited)" :to="route.path">
      {{ route.name }}
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
    addTab() {
      const route = this.$route
      if (!route.name || route.path === '/dashboard') return
      this.$store.dispatch('tabs_add', route)
    }
  }
}
</script>
