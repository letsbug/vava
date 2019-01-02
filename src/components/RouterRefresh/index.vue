<template>
  <a :class="{ 'active': doing }" class="va-nav-item handle-refresh" @click="handleRefresh">
    <va-icon icon="action-refresh" />
  </a>
</template>

<script>
export default {
  data() {
    return {
      doing: false
    }
  },
  methods: {
    replace(route) {
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + route.fullPath
        })
        this.doing = false
      })
    },
    handleRefresh() {
      if (this.doing) return
      this.doing = true
      const route = this.$route
      setTimeout(() => {
        this.$store.dispatch('tabs_del', route).then(() => {
          this.replace(route)
        })
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.handle-refresh.active .va-icon {
  animation: ani-rotate .8s ease-out infinite;
}
</style>
