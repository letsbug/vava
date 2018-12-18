<template>
  <div class="va-body-container">
    <GithubCorner />
    <div class="content-homepage">
      <h2 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h2>
      <div class="role-image">
        <img :src="roleImage" alt="" />
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
    roleImage() {
      return require(`@/assets/images/roles/${this.user.roles[0]}.gif`)
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
  height: 100%;
  padding-top: 100px;
  padding-bottom: $spacer-base;
  position: relative;

  .title {
    width: 100%;
    margin: 0;
    font-weight: 400;
    flex: 0.1;
    padding-top: $spacer-lg;
    position: absolute;
    top: 0;
  }

  .role-image {
    height: 100%;

    img {
      display: inline-block;
      max-height: 100%;
    }
  }
}
</style>
