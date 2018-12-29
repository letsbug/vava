<template>
  <div class="va-side-wrapper">
    <div class="va-side-brand">
      <va-svgs name="logo" class="brand-logo" />
      <va-svgs name="title" class="brand-title" />
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
