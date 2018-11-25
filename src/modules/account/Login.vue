<template>
  <div class="container-login--password">
    <el-form ref="loginForm" :model="form" :rules="rules" class="form-login--password" aria-autocomplete="list">
      <div class="form-logo">
        <img :src="logo" alt="VAVA" class="brand"/>
        <h2 class="title">{{ $t('login.title') }}<language-picker class="float-r"/></h2>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="form.username" :placeholder="$t('login.username')" type="text" size="large"
          name="username" @keyup.enter.native="handleLogin"
        >
          <va-icon slot="prefix" icon="people-user"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password" :placeholder="$t('login.password')" :type="password ? 'password' : 'text'"
          size="large" name="password" @keyup.enter.native="handleLogin"
        >
          <va-icon slot="prefix" icon="mark-lock"/>
          <va-icon
            slot="suffix" :icon="password ? 'mark-eye-close' : 'mark-eye-open'"
            @click.native="password = !password"
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.remember" :label="$t('login.remember')" class="checkbox-green" name="remember"/>
        <!--<router-link class="forget-link float-r" to="/password">Forgot password?</router-link>-->
        <a class="forget-link float-r" @click="userPickerVisible = true">{{ $t('login.list') }}</a>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" size="large" type="primary" class="btn-login" @click="handleLogin">
          {{ $t('login.login') }}
        </el-button>
      </el-form-item>
    </el-form>

    <user-picker :visible.sync="userPickerVisible" @on-change="fillLoginForm"/>

    <copyright/>
  </div>
</template>

<script>
import LanguagePicker from '@/components/LanguagePicker'
import UserPicker from '@/components/UserPicker'
import Copyright from '@/components/Copyright'
import { validUsername, validPassword } from '@/tools/validators'

export default {
  name: 'Login',
  metaInfo: { title: 'Sign in to Vava' },
  components: { LanguagePicker, UserPicker, Copyright },
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
      userPickerVisible: false
    }
  },
  methods: {
    fillLoginForm(user) {
      this.form.username = user.username
      this.form.password = 'a1234567'
      this.userPickerVisible = false
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
</style>
