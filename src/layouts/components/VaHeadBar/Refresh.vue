<template>
  <a class="va-nav-item" @click="handleRefresh">
    <va-icon icon="action-refresh" class="handle-refresh" :class="doing ? 'doing' : ''"/>
  </a>
</template>

<script>
export default {
  name: 'Refresh',
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
      this.$store.dispatch('tabs_del', route).then(() => {
        setTimeout(() => { this.replace(route) }, 500)
      })
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
