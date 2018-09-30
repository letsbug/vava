<template>
<div class="va-error-wrapper">
  <img :src="flag" alt=""><br>
  <h4 style="margin: 0">Oops! {{ code }} !!!</h4>
  <h5>{{ message }}</h5>
  <p>
    <a class="linker" @click.prevent.stop="$router.go(-1)" href="/">BACK</a>
    <router-link class="linker" to="/">HOME</router-link>
  </p>
  <va-copyright></va-copyright>
</div>
</template>

<script>
import VaCopyright from '@/components/copyright/VaCopyright'
export default {
  name: 'Error',
  components: { VaCopyright },
  metaInfo: {
    title: 'Oops! got an error!'
  },
  computed: {
    code() { return this.$route.params['code'] },
    flag() {
      const random = Math.floor(Math.random() * 4 + 1)
      return require('@/assets/flags/errors/err-' + random + '.gif')
    },
    message() {
      const _normalize = '瞎JB点，这回出错了吧！该！！！'
      const notices = {
        err404: 'The page you want to see may have moved...',
        err403: 'You don\'t have access to this page, do you want it? I won\'t give it to you!!!',
        err402: _normalize,
        err401: 'unauthorized! This requests require authentication.',
        err400: _normalize,
        err500: 'The server broke down and threw an error code at you ...',
      }
      return notices['err' + this.code]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";
.va-error-wrapper {
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: $spacer-base $spacer-base $spacer-xxl * 3;
  background-color: $color-white;
  text-align: center;
  position: relative;

  .va-copyright {
    position: absolute;
    bottom: $spacer-base;
    left: 0;
    right: 0;
  }

  .linker {
    margin: 0 $spacer-base;
  }
}
</style>
