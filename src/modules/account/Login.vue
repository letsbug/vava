<template>
  <div class="container-login">
    <el-form class="form-login" autoComplete="on" aria-autocomplete="list" :model="form" :rules="rules">
      <div class="form-logo">
        <img class="brand" :src="logo" alt="Vava">
        <h2 class="title">Sign in to Vava</h2>
      </div>
      <el-form-item prop="username">
        <el-input size="large" name="username" type="text" v-model="form.username" autoComplete="on" placeholder="username">
          <va-icon icon="user"></va-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" name="password" :type="passwordType" v-model="form.password" autoComplete="on"
                  placeholder="password" @keyup.enter.native="handleLogin">
          <svg slot="prefix" class="icon-svg" aria-hidden="true"><use xlink:href="#if-password"></use></svg>
          <svg slot="suffix" class="icon-svg" aria-hidden="true" @click.prevent="pwdShowHide"><use
            :xlink:href="(passwordType === 'password') ? '#if-hide' : '#if-show'"></use></svg>
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
        password: [{ validator: Validators.password, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    pwdShowHide() {},
    handleLogin() {}
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

$login-form-padding:      $spacer-base;
$login-form-width:        410px;
$login-form-logo-size:    56px;

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
}

</style>
