<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { meta } from './meta'

export default {
  name: 'App',
  metaInfo: meta,
  data() {
    return {
      theme: 'pink'
    }
  },
  mounted() {
    if (this.theme === 'pink') require('@/themes/light.scss')
  }
}
</script>
