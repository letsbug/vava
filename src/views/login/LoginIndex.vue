<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <h1 class="form-title">
        <img :src="logo" alt="Vue Admin Frame">
      </h1>
      <el-form-item prop="username">
        <el-input size="large" name="username" type="text" v-model="loginForm.username" autoComplete="on"
                  placeholder="username">
          <svg slot="prefix" class="icon-svg" aria-hidden="true"><use xlink:href="#if-user"></use></svg>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on"
                  placeholder="password" @keyup.enter.native="handleLogin">
          <svg slot="prefix" class="icon-svg" aria-hidden="true"><use xlink:href="#if-password"></use></svg>
          <svg slot="suffix" class="icon-svg" aria-hidden="true" @click.prevent="showPwd"><use
            :xlink:href="(passwordType === 'password') ? '#if-hide' : '#if-show'"></use></svg>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox-green" v-model="loginForm.remember" :label="expires + '天内自动登录'" name="remember"></el-checkbox>
        <router-link class="forget-link float-r" to="">忘记密码?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" class="btn-login" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>

    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '@/components/Copyright/Index'
import { isvalidUsername } from '@/utilities/Validate'

export default {
  name: 'LoginIndex',
  components: { Copyright },
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
    return {
      logo: require('@/assets/images/logo.png'),
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
      expires: this.$store.state.user.expire
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
          this.$store.dispatch('user_login', this.loginForm).then(() => {
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

<style scoped lang="scss">
  @import "../../styles/pages/login-page";

  .icon-eye-close, .icon-eye-open {
    color: #000;
  }
</style>
