<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('cache.hint')"></code></pre>
    <el-input v-model="input" type="text" title="route cache test" />
  </div>
</template>

<script>
import { Highlight } from '@/directives'
export default {
  name: 'Cache',
  metaInfo: {
    title: 'Cache'
  },
  directives: { Highlight },
  data() {
    return {
      input: ''
    }
  }
}
</script>
