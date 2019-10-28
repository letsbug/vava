<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('guide.hint')"></code></pre>
    <br />
    <el-button type="primary" @click.prevent.stop="start">{{ $t('guide.start') }}</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import steps from './guideSteps';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

@Component({ name: 'Guide' })
export default class extends Vue {
  // metaInfo: { title: 'Guide' }
  private driver!: Driver;

  mounted() {
    this.driver = new Driver({
      opacity: 0.4,
      padding: 5,
      allowClose: false,
      overlayClickNext: true
    });
  }

  private start() {
    this.driver.defineSteps(steps);
    this.driver.start();
  }
}
</script>
