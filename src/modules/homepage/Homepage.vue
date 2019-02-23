<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage text-center">
      <h1 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h1>
      <div ref="roleImage" class="role-image text-primary">
        <!-- The role image will be inserted here -->
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import { xhr } from '@/services/xhr'

export default {
  name: 'Homepage',
  components: { GithubCorner },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    const random = Math.floor(Math.random() * 7 + 1)
    xhr(`./static/svgs/${this.user.roles[0]}_0${random}.svg`).then(({ data }) => {
      this.$refs['roleImage'].innerHTML = data
    })
  }
}
</script>
