<template>
  <div class="va-body-container">
    <h5>Direct use</h5>
    <el-input v-model="url" readonly disabled style="width: 400px;" />
    <el-button
      :type="timing ? 'success' : 'primary'" :icon="timing ? 'el-icon-check' : 'el-icon-document'" :disabled="timing"
      class="copy-handler" @click="clipboard(url, $event, onSuccess)"
    >
      {{ timing ? 'Copied' : 'Copy' }}
    </el-button>
  </div>
</template>

<script>
import { clipboard } from '@/tools'

export default {
  name: 'Clipboard',
  data() {
    return {
      url: 'https://github.com/letsbug/vava',
      timing: false
    }
  },
  methods: {
    clipboard,
    onSuccess() {
      this.timing = true

      setTimeout(() => {
        this.timing = false
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";
h5 {
  margin-bottom: $spacer-base !important;
}
.copy-handler {
  transition: $transition-background;
}
</style>
