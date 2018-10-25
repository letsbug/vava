<template>
  <a class="va-nav-item" @click="handleRefresh">
    <va-icon icon="refresh" class="handle-refresh" :class="doing ? 'doing' : ''"/>
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
    handleRefresh() {
      const _this = this
      _this.doing = !_this.doing
      setTimeout(() => {
        _this.doing = !_this.doing
      }, 6000)
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
