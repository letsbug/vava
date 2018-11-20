<template>
  <div class="va-body-container">
    <github-corner/>
    <div class="content-homepage">
      <h1>Welcome!</h1>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Homepage',
  components: { GithubCorner }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.content-homepage {
  display: block;
  position: relative;
  margin-top: 10%;
  text-align: center;
}
</style>
