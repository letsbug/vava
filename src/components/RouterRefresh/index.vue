<template>
  <a class="va-nav-item" @click="handleRefresh">
    <va-icon :class="doing ? 'doing' : ''" icon="action-refresh" class="handle-refresh" />
  </a>
</template>

<script>
export default {
  name: 'RouterRefresh',
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

.handle-refresh {

  &.doing {
    color: $color-theme;
    animation: ani-rotate .8s ease-out infinite;
  }
}
</style>
