<template>
  <el-dialog
    :title="title || $t('login.list')" :visible.sync="dialogVisible"
    custom-class="user-simulate-dialog" top="10vh"
    append-to-body center
    @closed="handleClose"
  >
    <h5 style="margin-top: 0; text-align: center; font-weight: normal">
      {{ $t('login.listHint') }}
    </h5>
    <el-row :gutter="15">
      <el-col v-for="(_user, index) in list" :key="index" :xs="12" :sm="12" :md="8" :lg="8" :xl="6">
        <div
          :class="{ 'checked': index === checkedIndex }" class="va-panels has-interaction user-list"
          @click="handleChoose(_user, index)"
        >
          <img :src="_user.avatar" alt="" class="avatar" />
          <h5 class="username">
            {{ _user.username }}
          </h5>
          <div class="text-muted user-attrs text-ellipsis">
            <span class="hidden-xs-only">
              {{ $t('roles.title') }}:
            </span>
            {{ $t(`roles.${_user.roles[0]}`) }}
          </div>
          <span class="checked-flag text-primary">
            <i class="el-icon-check"></i>
          </span>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import Service from '@/apis/account'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      checkedIndex: -1
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    visible(v) {
      this.dialogVisible = v
    }
  },
  mounted() {
    Service.list().then(res => {
      this.list = res.data
      this.list.forEach((v, i) => {
        if (v.token === this.user.token) this.checkedIndex = i
      })
    })
  },
  methods: {
    handleChoose(user, index) {
      this.checkedIndex = index
      this.$emit('on-change', user)
    },
    handleClear() {
      this.checkedIndex = -1
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

$avatar-size:   40px;
$list-padding:  $spacer-xs;
.user-list {
  height: $avatar-size + $list-padding * 2;
  padding: $list-padding $list-padding $list-padding ($avatar-size + $spacer-sm + $list-padding);
  margin-bottom: 15px;
  position: relative;
  border-color: $border-color;

  .avatar {
    display: block;
    width: $avatar-size;
    height: $avatar-size;
    position: absolute;
    left: $list-padding;
    top: $list-padding;
    border-radius: 50%;
    overflow: hidden;
  }

  .username {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .checked-flag {
    padding: 6px 8px;
    font-size: $font-size-h4;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transform: $transition-opacity;
  }

  &.checked .checked-flag {
    opacity: 1;
  }
}

@media screen and (max-width: $device-md) {
  /deep/ .user-simulate-dialog {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto !important;
    margin: $spacer-base !important;
    padding-top: 54px;

    .el-dialog__header {
      margin-top: -54px;
    }

    .el-dialog__body {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
