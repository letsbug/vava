<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage text-center">
      <h1 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ user.nick | capitalize }}</strong> !
      </h1>
      <div ref="roleImage" class="role-image text-primary">
        <!-- The role image will be inserted here -->
      </div>
    </div>
  </div>
</template>

<script>
import { GithubCorner } from '@/components'
import { xhr } from '@/apis/xhr'
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  components: { GithubCorner },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    const { sex, roles } = this.user
    // console.log(this.user)
    xhr(`./static/svgs/${roles[0]}_${sex}.svg`).then(({ data }) => {
      this.$refs['roleImage'].innerHTML = data
    })
  }
}
</script>
