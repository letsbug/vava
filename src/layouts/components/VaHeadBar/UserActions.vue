<template>
  <el-dropdown :show-timeout="100" trigger="click" style="float: left;" @command="userDropdown">
    <a class="va-nav-item spacer-xs link-user">
      <img :src="user.avatar" alt="" class="avatar" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="handleUserInfo">
        Signed in as <strong>{{ user.nick }}</strong>
      </el-dropdown-item>
      <el-dropdown-item :command="handleUserInfo" divided>
        {{ $t('header.profile') }}
      </el-dropdown-item>
      <el-dropdown-item :command="handleSettings">
        {{ $t('header.settings') }}
      </el-dropdown-item>
      <el-dropdown-item :command="handleUserSwitch" divided>
        {{ $t('header.switchUser') }}
      </el-dropdown-item>
      <el-dropdown-item :command="handleLogout">
        {{ $t('header.logout.title') }}
      </el-dropdown-item>
    </el-dropdown-menu>

    <user-picker :visible.sync="userPickerVisible" :title="$t('header.switchUser')" @on-change="onChooseUser" />
  </el-dropdown>
</template>

<script>
import { UserPicker } from '@/components'
import { mapGetters } from 'vuex'

export default {
  components: { UserPicker },
  data() {
    return {
      userPickerVisible: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    userDropdown(target) {
      target()
    },
    handleUserInfo() {
      // TODO build user information route
      console.log('clicked user info')
    },
    handleSettings() {
      // TODO build user settings route
    },
    handleUserSwitch() {
      this.userPickerVisible = true
    },
    async onChooseUser(user) {
      await this.$store.dispatch('user_switch', user.token)

      this.userPickerVisible = false
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + this.$route.fullPath
        })
      })
    },
    async handleLogout() {
      try {
        const action = await this.$confirm(this.$t('header.logout.confirm'), this.$t('options.confirm.title'), {
          type: 'warning',
          confirmButtonText: this.$t('header.logout.button')
        })

        if (action !== 'confirm') {
          return false
        }

        await this.$store.dispatch('user_logout')
        location.reload()
      } catch (e) {
        console.log('sign out', e)
      }
    }
  }
}
</script>
