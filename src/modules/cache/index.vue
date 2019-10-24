<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('cache.hint')"></code></pre>
    <el-input v-model="input" type="text" title="route cache test" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Cache' })
export default class extends Vue {
  // metaInfo: {
  //   title: 'Cache'
  // }

  input: string = '';
}
</script>
