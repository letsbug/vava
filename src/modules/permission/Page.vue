<template>
  <div class="va-body-container">
    <div class="user-info">
      <div class="avatar">
        <img :src="user.avatar" alt=""/>
      </div>
      <div class="attrs">
        <div class="username">
          {{ user.username }}
          <el-tooltip content="change current user">
            <va-icon icon="action-refresh" class="handle-user-change" @click.native="userPickerVisible = true"/>
          </el-tooltip>
        </div>
        <div class="text-muted">Your roles: {{ user.roles }}</div>
      </div>
    </div>
    <user-picker :visible.sync="userPickerVisible" @on-change="onChooseUser"/>
  </div>
</template>

<script>
import UserPicker from '@/components/UserPicker'

export default {
  name: 'Page',
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
    onChooseUser(user) {
      console.log(user)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";
$avatar-size:     68px;

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
