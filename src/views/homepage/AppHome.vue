<template>
  <div class="container-body no-bg app-home text-center">
    <div class="content">
      <img class="logo" :src="url_logo" alt="">
      <h1>Welcome to use vue admin</h1>
      <h3 class="text-muted">build with vue.js & element ui</h3>
      <p><small>>></small> <a href="https://github.com/gzb219/Vue-admin-frame" target="_blank">github</a> <small><<</small></p>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  data() {
    return {
      url_logo: require('@/assets/images/logo.png')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.app-home {
  display: table;
  width: 100%;
  height: 100%;
}
.content {
  display: table-cell;
  vertical-align: middle;
}
.logo {
  width: 86px;
  height: 86px;
}
h1, h2, h3, h4, h5, h6 {font-weight: normal;}
h1 {color: $theme-color;}
a {text-decoration: none;}
</style>
