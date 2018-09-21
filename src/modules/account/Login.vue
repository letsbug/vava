<template>
  <div class="container-login--password">
    <el-form ref="loginForm" class="form-login--password" autoComplete="on" aria-autocomplete="list" :model="form" :rules="rules">
      <div class="form-logo">
        <img class="brand" :src="logo" alt="Vava">
        <h2 class="title">Sign in to Vava</h2>
      </div>
      <el-form-item prop="username">
        <el-input size="large" name="username" type="text" v-model="form.username" autoComplete="on" placeholder="username">
          <va-icon slot="prefix" icon="user"></va-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" name="password" :type="password ? 'password' : 'text'" v-model="form.password" autoComplete="on"
                  placeholder="password" @keyup.enter.native="handleLogin">
          <va-icon slot="prefix" icon="lock"></va-icon>
          <va-icon slot="suffix" :icon="password ? 'eye-close' : 'eye-open'" @click.native="password = !password"></va-icon>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox-green" v-model="form.remember" :label="'Remember (' + expires + ' days)'" name="remember"></el-checkbox>
        <router-link class="forget-link float-r" to="/password">Forgot password?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" class="btn-login" :loading="loading" @click="handleLogin">Sign in</el-button>
      </el-form-item>
    </el-form>

    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '@/components/copyright/VaCopyright'
import { Validators } from '@/tools'

export default {
  name: 'Login',
  metaInfo: { title: 'Sign in to Vava' },
  components: { Copyright },
  data() {
    return {
      logo: require('@/assets/images/logo.png'),
      form: { username: 'admin', password: '123456789', remember: false },
      rules: {
        username: [{ validator: Validators.username, trigger: 'blur' }],
        password: [{ validator: Validators.passwordLogin, trigger: 'blur' }]
      },
      loading: false,
      password: true,
      expires: 7
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/views/login--forget";
</style>
