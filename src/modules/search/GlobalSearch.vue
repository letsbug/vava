<template>
  <div class="va-body-container">
    <h4 v-if="keyword" class="va-body-title lowercase">
      "{{ keyword }}" search results
    </h4>
    <div v-else class="text-center">
      <br />
      <br />
      <br />
      <br />
      <h5>Nothing, please enter something...</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  metaInfo() {
    return {
      title: `Search for "${this.keyword}"`
    }
  },
  computed: {
    keyword() { return this.$route.params['keyword'] }
  }
}
</script>
