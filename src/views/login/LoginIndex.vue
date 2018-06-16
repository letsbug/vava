<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <h1 class="form-title">Login Form</h1>
      <el-form-item prop="username">
        <el-input size="large" name="username" type="text" v-model="loginForm.username" autoComplete="on"
                  placeholder="username">
          <i slot="prefix" class="iconfont icon-fw icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on"
                  placeholder="password" @keyup.enter.native="handleLogin">
          <i slot="prefix" class="iconfont icon-fw icon-password"></i>
          <i slot="suffix" class="iconfont icon-fw" :class="passwordType === 'password'?'icon-eye-close':'icon-eye-open'" @click="showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox-green" v-model="loginForm.remember" :label="expires + '天内自动登录'" name="remember"></el-checkbox>
        <router-link class="float-right forget-link" to="">忘记密码?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="success" class="btn-login" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>

    <!--<copyright></copyright>-->
  </div>
</template>

<script>
// import { Copyright } from '@/components'
import { isvalidUsername } from '@/utilities/Validate'

export default {
  name: 'LoginIndex',
  // components: { Copyright },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入您的登录用户名'))
      } else callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度过短（最少6位）'))
      } else callback()
    }
    console.log(this.$store.state.userInfo)
    return {
      loginForm: {
        username: 'admin',
        password: '1111111111',
        remember: false
      },
      loginRules: {
        username: [{ required: true, trigger: ['blur', 'change'], validator: validateUsername }],
        password: [
          { required: true, trigger: ['blur', 'change'], message: '请输入您的登录密码' },
          { minWidth: 6, trigger: ['blur', 'change'], validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      expires: this.$store.state.userInfo.token.expire
    }
  },
  methods: {
    showPwd() {
      this.passwordType = (this.passwordType === 'password' ? '' : 'password')
    },
    handleLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('userLogin', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  $login-form-padding:  $spacer;
  $login-form-width:    380 + $login-form-padding * 2;

  .login-container {
    background-color: $color-blue-dark;
    height: 100%;
    color: $gray-200;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      margin-top: -80px;
      width: 380px;
      padding: 0 $login-form-padding;

      .form-title {
        margin-top: 0;
        margin-bottom: $spacer * 4;
        text-align: center;
      }

      .checkbox-green .el-checkbox__input {
        .el-checkbox__inner:hover {
          border-color: $color-green !important;
        }

        &.is-checked .el-checkbox__inner,
        &.is-indeterminate .el-checkbox__inner{
          background-color: $color-green !important;
          border-color: $color-green !important;
        }

        &.is-checked+.el-checkbox__label {
          color: $color-green !important;
        }
      }

      .forget-link {
        color: $gray-650;
      }

      .el-button.btn-login {
        width: 100%;
      }
    }

    .copyright {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      margin-bottom: $foobar-padding-y;
      white-space: nowrap;

      br {
        display: none;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .login-container .login-form {
      width: 100%;
    }
  }
</style>

<style scoped>
  .icon-eye-close, .icon-eye-open {
    color: #000;
  }
</style>
