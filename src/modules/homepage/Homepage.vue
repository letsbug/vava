<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage text-center">
      <h2 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.username | capitalize }}</strong> !
      </h2>
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
    const el = this.$refs['roleImage']
    console.log(el)
    const random = Math.floor(Math.random() * 7 + 1)
    xhr(`./static/images/svgs/${this.user.roles[0]}_0${random}.svg`).then(({ data }) => {
      el.innerHTML = data
    })
  }
}
</script>
