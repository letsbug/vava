<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('cache.hint')"/></pre>
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

  private input: string = '';
}
</script>
