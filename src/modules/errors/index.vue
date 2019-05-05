<template>
  <div class="va-error-wrapper">
    <img :src="flag" alt="" />
    <br />
    <h4 style="margin: 0">
      Oops! {{ code }} !!!
    </h4>
    <h5>{{ $t(`errors.type${code}`) }}</h5>
    <p>
      <a v-if="!noGoBack" href="/" class="linker" @click.prevent.stop="$router.go(-1)">
        {{ $t('errors.actionBack') }}
      </a>
      <router-link class="linker" to="/">
        {{ $t('errors.actionHome') }}
      </router-link>
    </p>
    <copyright />
  </div>
</template>

<script>
import { Copyright } from '@/components'
export default {
  name: 'Error',
  components: { Copyright },
  metaInfo: {
    title: 'Oops! got an error!'
  },
  computed: {
    code() {
      return this.$route.query['code'] || 404
    },
    flag() {
      const random = Math.floor(Math.random() * 4 + 1)
      return `./static/images/errors/err-${random}.gif`
    },
    noGoBack() {
      return this.$route.query['noGoBack']
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";
.va-error-wrapper {
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: $spacer-base $spacer-base 15vh;
  background-color: $color-white;
  text-align: center;
  position: relative;

  .linker {
    margin: 0 $spacer-base;
  }

  .va-copyright {
    position: absolute;
    bottom: $spacer-base;
    left: 0;
    right: 0;
  }
}
</style>
