<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage">
      <h2 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h2>
      <div ref="roleImage" class="role-image">
        <home-figure :name="figure" />
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import HomeFigure from './components/Figure'
import '@/assets/figures'

export default {
  name: 'Homepage',
  components: { GithubCorner, HomeFigure },
  computed: {
    user() {
      return this.$store.getters.user
    },
    figure() {
      // const random = Math.floor(Math.random() * 7 + 1)
      return `${this.user.token}_03`
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
    margin: 0 0 $spacer-xxl;
    font-weight: 400;
    flex: 1;
  }

  .role-image {
    color: $color-theme;
    flex: 9;
  }
}
</style>
