<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage">
      <h2 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h2>
      <div ref="roleImage" class="role-image">
        <!-- TODO BUG：任何弹窗、浮层的显示隐藏事件都会使得svg被放大 -->
        <va-svgs :name="figure" />
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
    figure() {
      const random = Math.floor(Math.random() * 7 + 1)
      return `${this.user.roles[0]}_0${random}`
      // return `${this.user.roles[0]}_05`
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

/deep/ .va-svg-image {
  width: 100%;
  height: 100%;
}
</style>
