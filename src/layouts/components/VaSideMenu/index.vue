<template>
  <div class="va-side-wrapper">
    <div class="va-side-brand">
      <span class="brand-name">
        <strong>Va</strong>
        <span class="subname">
          va
        </span>
      </span>
    </div>
    <va-side-menu :routes="routes_permission" />
  </div>
</template>

<script>
import VaSideMenu from './VaSideMenu'
import { mapGetters } from 'vuex'

export default {
  components: { VaSideMenu },
  computed: {
    ...mapGetters(['routes_permission'])
  }
}
</script>
