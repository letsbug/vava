<template>
  <div class="va-body-container">
    <div class="welcome-backdrop">
      <canvas id="canv"></canvas>
    </div>
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
  components: { GithubCorner },
  mounted() {
    import('@/vendor/welcomes/firefly')
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.welcome-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  #canv {
    width: 100%;
    height: 100%;
  }
}

.content-homepage {
  display: block;
  position: relative;
  margin-top: 10%;
  text-align: center;
}
</style>
