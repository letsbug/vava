<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { meta } from './meta'

export default {
  name: 'App',
  metaInfo: meta
}
</script>
