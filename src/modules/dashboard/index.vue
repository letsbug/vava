<template>
  <div class="va-body-container">
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
