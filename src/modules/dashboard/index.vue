<template>
  <div class="va-body-container">
    <h1>Page views</h1>
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { PanelGroup },
  data() {
    return {}
  }
}
</script>
