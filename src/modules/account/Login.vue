<template>
  <div class="container-login">
    <el-form class="form-login" autoComplete="on" aria-autocomplete="list" :model="form" :rules="rules">
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
          <va-icon slot="suffix" :icon="password ? 'eye-close' : 'eye-open'" @click="pwdShowHide"></va-icon>
        </el-input>
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
      password: true
    }
  },
  methods: {
    pwdShowHide() { this.password = !this.password },
    handleLogin() {}
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

$login-form-padding:      $spacer-base;
$login-form-width:        380px;
$login-form-logo-size:    56px;
$login-form-icon-size:    $font-size-h4;
$login-form-icon-color:   $color-gray-600;

.container-login {
  display: flex;
  justify-content: center;
  height: 100%;
  color: $color-gray-300;
  background-color: $sidebar-bg-color;

  .va-copyright {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    margin-bottom: $spacer-base;
    white-space: nowrap;
    color: $color-gray-300;
  }
}

.form-login {
  margin-top: 56px;
  width: $login-form-width;
  padding: 0 $login-form-padding;

  .form-logo {
    text-align: center;
  }

  .brand {
    width: $login-form-logo-size;
  }

  .title {
    font-weight: 300;
  }

  .va-icon {
    margin-left: 2px;
    width: $login-form-icon-size;
    height: $login-form-icon-size;
    vertical-align: -3px;
    fill: $login-form-icon-color;
  }
}

</style>
