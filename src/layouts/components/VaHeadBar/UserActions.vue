<template>
  <el-dropdown :show-timeout="100" trigger="click" style="float: left;" @command="userDropdown">
    <a class="va-nav-item spacer-xs link-user">
      <img :src="user.avatar" alt="" class="avatar"/>
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="handleUserInfo">{{ $t('header.profile') }}</el-dropdown-item>
      <el-dropdown-item :command="handleSettings">{{ $t('header.settings') }}</el-dropdown-item>
      <el-dropdown-item :command="handleUserSwitch" divided>{{ $t('header.switchUser') }}</el-dropdown-item>
      <el-dropdown-item :command="handleLogout">{{ $t('header.logout.title') }}</el-dropdown-item>
    </el-dropdown-menu>

    <user-picker :visible.sync="userPickerVisible" :title="$t('header.switchUser')" @on-change="onChooseUser"/>
  </el-dropdown>
</template>

<script>
import UserPicker from '@/components/UserPicker'

export default {
  name: 'UserActions',
  metaInfo: {
    title: 'UserActions'
  },
  components: { UserPicker },
  data() {
    return {
      userPickerVisible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
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
    onChooseUser(user) {
      this.$store.dispatch('user_switch', user.token).then(() => {
        this.userPickerVisible = false
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + this.$route.fullPath
          })
        })
      })
    },
    handleLogout() {
      this.$confirm(this.$t('header.logout.confirm'), this.$t('options.confirm.title'), {
        type: 'warning',
        confirmButtonText: this.$t('header.logout.button'),
        callback: action => {
          if (action === 'confirm') this.$store.dispatch('user_logout').then(() => { location.reload() })
        }
      })
    }
  }
}
</script>
