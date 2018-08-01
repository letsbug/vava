<template>
  <div class="app-errs-container">
    <div class="app-errs-with404">
      <div class="error-logo">
        <img :src="img" alt="">
      </div>
      <div class="options">
        <div class="title">Oops! 404!!!</div>
        <div class="subtitle">页面调皮了，不知道跑哪儿去了......</div>
        <div>
          <el-button type="text" @click.prevent="$router.push('/')">HOME</el-button>
          <el-button type="text" @click.prevent="$router.go(-1)">BACK</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data() {
    return {
      img: './static/errors/404-'
    }
  },
  created() {
    const random = Math.floor(Math.random() * 4 + 1)
    this.img += random + '.gif'
  }
}
</script>
