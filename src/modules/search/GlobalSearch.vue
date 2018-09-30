<template>
  <div class="va-body-container">
    <h4 class="va-body-title">Search for '{{ keyword }}'</h4>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  computed: {
    keyword() { return this.$route.params['keyword'] }
  }
}
</script>

<style scoped>

</style>
