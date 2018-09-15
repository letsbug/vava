<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { meta } from './meta'

export default {
  name: 'App',
  data() {
    return {
      routeName: ''
    }
  },
  metaInfo: meta,
  created() {
    this.routeName = 'aa'
  }
}
</script>
