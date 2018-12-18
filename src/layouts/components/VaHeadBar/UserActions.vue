<template>
  <ElDropdown :show-timeout="100" trigger="click" style="float: left;" @command="userDropdown">
    <a class="va-nav-item spacer-xs link-user">
      <img :src="user.avatar" alt="" class="avatar" />
    </a>
    <ElDropdownMenu slot="dropdown">
      <ElDropdownItem :command="handleUserInfo">
        Signed in as <strong>{{ user.username }}</strong>
      </ElDropdownItem>
      <ElDropdownItem :command="handleUserInfo" divided>
        {{ $t('header.profile') }}
      </ElDropdownItem>
      <ElDropdownItem :command="handleSettings">
        {{ $t('header.settings') }}
      </ElDropdownItem>
      <ElDropdownItem :command="handleUserSwitch" divided>
        {{ $t('header.switchUser') }}
      </ElDropdownItem>
      <ElDropdownItem :command="handleLogout">
        {{ $t('header.logout.title') }}
      </ElDropdownItem>
    </ElDropdownMenu>

    <UserPicker :visible.sync="userPickerVisible" :title="$t('header.switchUser')" @on-change="onChooseUser" />
  </ElDropdown>
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
