<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('guide.hint')"></code></pre>
    <br />
    <el-button type="primary" @click.prevent.stop="start">{{ $t('guide.start') }}</el-button>
  </div>
</template>

<script>
import { Highlight } from '@/directives'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './guideSteps'

export default {
  name: 'Guide',
  metaInfo: {
    title: 'Guide'
  },
  directives: { Highlight },
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver({
      opacity: 0.4,
      padding: 5,
      allowClose: false,
      overlayClickNext: true
    })
  },
  methods: {
    start() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
