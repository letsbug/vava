<template>
  <div class="va-error-wrapper">
    <img :src="flag" alt="" />
    <br />
    <h4 style="margin: 0">
      Oops! {{ code }} !!!
    </h4>
    <h5>{{ $t(`errors.type${code}`) }}</h5>
    <p>
      <a href="/" class="linker" @click.prevent.stop="$router.go(-1)">
        {{ $t('errors.actionBack') }}
      </a>
      <RouterLink class="linker" to="/">
        {{ $t('errors.actionHome') }}
      </RouterLink>
    </p>
    <VaCopyright />
  </div>
</template>

<script>
import VaCopyright from '@/components/Copyright'
export default {
  name: 'Error',
  components: { VaCopyright },
  metaInfo: {
    title: 'Oops! got an error!'
  },
  computed: {
    code() {
      return this.$route.query['code'] || 404
    },
    flag() {
      const random = Math.floor(Math.random() * 4 + 1)
      return require(`@/assets/flags/errors/err-${random}.gif`)
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
