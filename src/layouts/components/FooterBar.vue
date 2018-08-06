<template>
  <div class="app-footer clearfix">
    <span class="text-muted">App foot bar</span>

    <!-- Include copyright component -->
    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '@/components/Copyright/Index'
export default {
  name: 'FooterBar',
  components: { Copyright }
}
</script>

<style scoped>
  .copyright {
    float: right;
  }
</style>
