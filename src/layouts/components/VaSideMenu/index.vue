<template>
  <div class="va-side-wrapper">
    <brand class="va-side-brand" has-title has-link />
    <va-side-menu :routes="routes_permission" />
  </div>
</template>

<script>
import { Brand } from '@/components'
import VaSideMenu from './VaSideMenu'
import { mapGetters } from 'vuex'

export default {
  components: { Brand, VaSideMenu },
  computed: {
    ...mapGetters(['routes_permission'])
  }
}
</script>
