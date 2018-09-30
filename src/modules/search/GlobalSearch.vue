<template>
  <div class="va-body-container">
    <h4 class="va-body-title lowercase" v-if="keyword">"{{ keyword }}" search results</h4>
    <div v-else class="text-center">
      <br>
      <br>
      <br>
      <br>
      <h5>Nothing, please enter something...</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  computed: {
    keyword() { return this.$route.query['keyword'] }
  }
}
</script>

<style scoped>

</style>
