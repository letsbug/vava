<template>
  <div class="app-errs-with404">
    <div class="options">
      <div class="title">Oops! 404!!!</div>
      <div class="subtitle">页面调皮了，不知道跑哪儿去了......</div>
    </div>
    <div class="error-logo">
      <img :src="img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data() {
    return {
      img: '/static/errors/404-'
    }
  },
  mounted() {
    const random = Math.floor(Math.random() * 11)
    this.img += random + '.gif'
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  body {
    background-color: $white;
  }

  .app-errs-with404 {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: row;

    .options {
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin-right: $spacer-x*2;
    }

    .title {
      font-size: 32px;
      margin-bottom: $spacer-y;
      color: $color-blue-light;
    }

    .subtitle {
      letter-spacing: 2px;
    }

    .error-logo {
      width: 130px;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
