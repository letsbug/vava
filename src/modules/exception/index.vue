<template>
  <div class="va-body-container">
    <el-button
      v-for="handler in handlers"
      :key="handler"
      type="primary"
      plain
      class="exception-trigger"
      @click="trigger(handler)"
    >
      {{ $t('exception.' + handler) }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Exception',
  metaInfo: {
    title: 'Exception'
  },
  data() {
    return {
      handlers: [401, 403, 404, 500]
    }
  },
  methods: {
    trigger(code) {
      this.$router.push({
        path: '/error',
        replace: true,
        query: { code: code }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";
@media screen and (max-width: $device-md) {
  .exception-trigger {
    width: 100%;
    margin-left: 0;

    & + .exception-trigger {
      margin-top: $spacer-base;
    }
  }
}
</style>
