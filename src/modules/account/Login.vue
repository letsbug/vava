<template>
  <div class="container-login--password">
    <el-form ref="loginForm" class="form-login--password" autoComplete="on" aria-autocomplete="list"
             :model="form" :rules="rules">
      <div class="form-logo">
        <img class="brand" :src="logo" alt="VAVA">
        <h2 class="title text-left">
          {{ $t('login.title') }}
          <language-picker class="float-r"></language-picker>
        </h2>
      </div>
      <el-form-item prop="username">
        <el-input size="large" name="username" type="text" v-model="form.username"
                  @keyup.enter.native="handleLogin" :placeholder="$t('login.username')">
          <va-icon slot="prefix" icon="people-user"></va-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" name="password" :type="password ? 'password' : 'text'" v-model="form.password"
                  @keyup.enter.native="handleLogin" :placeholder="$t('login.password')">
          <va-icon slot="prefix" icon="mark-lock"></va-icon>
          <va-icon
            slot="suffix"
            :icon="password ? 'mark-eye-close' : 'mark-eye-open'"
            @click.native="password = !password">
          </va-icon>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox-green" v-model="form.remember" :label="$t('login.remember')" name="remember"
        ></el-checkbox>
        <!--<router-link class="forget-link float-r" to="/password">Forgot password?</router-link>-->
        <a class="forget-link float-r" @click="listDialogVisible = true">{{ $t('login.list') }}</a>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" class="btn-login" :loading="loading" @click="handleLogin">
          {{ $t('login.login') }}
        </el-button>
      </el-form-item>
    </el-form>

    <copyright></copyright>

    <el-dialog :title="$t('login.list')" custom-class="user-simulate-dialog" append-to-body center
               :visible.sync="listDialogVisible">
      <h5 style="margin-top: 0; text-align: center; font-weight: normal" v-html="$t('login.listHint')"></h5>
      <el-row :gutter="15">
        <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" v-for="(user, index) in userSimulateList" :key="index">
          <div class="user-list" :class="{ 'checked': user.checked }" @click="fillLoginForm(user)">
            <img class="avatar" :src="user.avatar" alt="">
            <h5 class="username">{{ user.username }}</h5>
            <span class="text-muted"><span class="hidden-xs-only">role: </span>{{ user.roles[0] }}</span>
            <span class="checked-flag"><i class="el-icon-check"></i></span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import LanguagePicker from '@/components/LanguagePicker'
import Copyright from '@/components/Copyright'
import Service from '@/services/account'
import { validUsername, validPassword } from '@/tools/validators'

export default {
  name: 'Login',
  metaInfo: { title: 'Sign in to Vava' },
  components: { LanguagePicker, Copyright },
  data() {
    return {
      logo: require('@/assets/images/logo.png'),
      form: { username: '', password: '', remember: false },
      rules: {
        username: [{ validator: this.validUsername, trigger: 'blur' }],
        password: [{ validator: this.validPassword, trigger: 'blur' }]
      },
      loading: false,
      password: true,
      expires: 7,
      listDialogVisible: false,
      userSimulateList: []
    }
  },
  methods: {
    getUserList() {
      Service.list().then(res => {
        this.userSimulateList = res.map(v => {
          this.$set(v, 'checked', false)
          return v
        })
        // this.fillLoginForm(this.userSimulateList[0])
      })
    },
    fillLoginForm(user) {
      this.userSimulateList.forEach(v => {
        v.checked = user.token === v.token
      })
      this.form.username = user.username
      this.form.password = '123456789'
      this.listDialogVisible = false
    },
    handleLogin() {
      this.$refs['loginForm'].validate(v => {
        if (!v) return false
        this.loading = true
        this.$store.dispatch('user_login', this.form).then(res => {
          this.loading = false
          this.$router.push(this.$route.query['redirect'] || '/')
        }).catch(() => { this.loading = false })
        return true
      })
    },
    validUsername,
    validPassword
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style scoped lang="scss">
@import "./styles/login--forget";

.form-tips {
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
}

/deep/ .lang-picker {
  color: $color-white;
  font-size: $font-size-h2;

  .va-icon {
    vertical-align: -5px;
  }
}

$avatar-size:   40px;
$list-padding:  $spacer-xs;
.user-list {
  height: $avatar-size + $list-padding * 2;
  padding: $list-padding $list-padding $list-padding ($avatar-size + $spacer-sm + $list-padding);
  margin-bottom: 15px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border-radius: $radius-base;
  border: $border-default;
  transition: $transition-border;

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
    color: $color-theme;
    font-size: $font-size-h4;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transform: $transition-opacity;
  }

  &:hover, &.checked {
    border-color: $color-theme;
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
