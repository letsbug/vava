<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage">
      <h2 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h2>
      <div ref="roleImage" class="role-image">
        <embed :src="randomImage" />
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Homepage',
  components: { GithubCorner },
  computed: {
    user() {
      return this.$store.getters.user
    },
    randomImage() {
      const random = Math.floor(Math.random() * 7 + 1)
      return `./static/images/figures/figure_${this.user.token}_0${random}.svg`
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.va-body-container {
  text-align: center;
  overflow: hidden;
}

.content-homepage {
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  padding: $spacer-xxl 0;

  .title {
    width: 100%;
    margin: 0 0 $spacer-xxl*2;
    font-weight: 400;
    flex: 0.1;
  }

  .role-image, embed {
    max-width: 100%;
    max-height: 100%;
  }

  embed {
    display: inline-block;
  }
}
</style>
