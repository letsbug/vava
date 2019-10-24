<template>
  <div class="va-body-container">
    <div class="user-info">
      <div class="avatar">
        <img :src="avatar" alt="" />
      </div>
      <div class="attrs">
        <div class="username">
          {{ username }}
          <el-tooltip :content="$t('header.switchUser')">
            <va-icon icon="action-refresh" class="handle-user-change" @click.native="userPickerVisible = true" />
          </el-tooltip>
        </div>
        <div class="text-muted">
          {{ $t('permissions.yours', { roles }) }}
        </div>
      </div>
    </div>
    <user-picker :visible.sync="userPickerVisible" @on-change="onChooseUser" />

    <br />
    <h2 v-html="$t('permissions.title', { role: allowRoles })"></h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserPicker } from '@/components';
import { IStoreUser, IStateUser } from '@/store/modules/user';

@Component({ name: 'Admin', components: { UserPicker } })
export default class extends Vue {
  userPickerVisible: boolean = false;

  get avatar() {
    return IStoreUser.avatar;
  }

  get username() {
    return IStoreUser.username;
  }

  get roles() {
    return IStoreUser.roles.map(v => this.$t(`roles.${v}`)).join('、');
  }

  get allowRoles() {
    const role = [...this.$route.meta.roles];
    return role.map(v => this.$t(`roles.${v}`)).join(' & ');
  }

  async onChooseUser(user: IStateUser) {
    await IStoreUser.SwitchUser(user.token!);

    this.userPickerVisible = false;
    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + this.$route.fullPath
      });
    });
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';
$avatar-size: 68px;

.user-info {
  display: flex;
  height: $avatar-size;
  margin-bottom: $spacer-base;

  .avatar {
    width: $avatar-size;
    height: $avatar-size;
    border-radius: 50%;
    overflow: hidden;
    margin-right: $spacer-base;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .handle-user-change {
    cursor: pointer;
    vertical-align: -4px;
  }

  .username {
    margin-top: $spacer-xxs;
    margin-bottom: $spacer-base;
    font-size: $font-size-h3;
    font-weight: 500;
  }
}
</style>
