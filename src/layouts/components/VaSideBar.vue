<template>
  <div class="va-sidebar">
    <div class="va-side-brand">
      <span class="brand-name"><strong>Va</strong><span class="subname">mini</span></span>
    </div>
    <va-side-menu></va-side-menu>
  </div>
</template>

<script>
import VaSideMenu from '@/components/sidebar-menus/VaSideMenu'
export default {
  name: 'VaSideBar',
  components: { VaSideMenu },
  data() {
    return {
      logo: require('@/assets/logo.png')
    }
  }
}
</script>
