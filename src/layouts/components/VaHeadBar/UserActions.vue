<template>
  <el-dropdown :show-timeout="100" trigger="click" style="float: left;" @command="userDropdown">
    <a class="va-nav-item spacer-xs link-user">
      <img :src="avatar" alt="" class="avatar" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="handleUserInfo">
        Signed in as <strong>{{ nickname }}</strong>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserPicker } from '@/components';
import { IStoreUser, IStateUser } from '@/store/modules/user';

@Component({ name: 'LayoutUserAction', components: { UserPicker } })
export default class extends Vue {
  userPickerVisible: boolean = false;

  get avatar() {
    return IStoreUser.avatar;
  }

  get nickname() {
    return IStoreUser.nickname;
  }

  userDropdown(target: Function) {
    target();
  }

  handleUserInfo() {
    // TODO build user information route
    console.log('clicked user info');
  }

  handleSettings() {
    // TODO build user settings route
  }

  handleUserSwitch() {
    this.userPickerVisible = true;
  }

  async onChooseUser(user: IStateUser) {
    // TODO Wait for the perfect.
    // await IStoreUser.SwitchUser(user.token!);
    // this.userPickerVisible = false;
    // this.$nextTick(() => {
    //   this.$router.replace({
    //     path: '/redirect' + this.$route.fullPath
    //   });
    // });
  }

  async handleLogout() {
    const message = this.$t('header.logout.confirm') as string;
    const title = this.$t('options.confirm.title') as string;
    const confirmButtonText = this.$t('header.logout.button') as string;
    this.$confirm(message, title, { type: 'warning', confirmButtonText }).then(async () => {
      await IStoreUser.Logout();
      location.reload();
    });
  }
}
</script>
