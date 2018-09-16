<template>
  <div class="container-login--password">
    <div class="form-login--password">
      <div class="form-logo">
        <img class="brand" :src="logo" alt="Vava">
        <h2 class="title">Reset your password</h2>
      </div>
      <el-form ref="confirmEmail" v-if="step === 1" autoComplete="on" aria-autocomplete="list" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input size="large" name="username" type="text" v-model="form.username" autoComplete="on" placeholder="Your email address or phone number."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" class="btn-login" :loading="loading" @click.native.prevent="validEmailOrPhone">
            Send password reset security code
          </el-button>
        </el-form-item>
      </el-form>
      <el-form ref="confirmSecurityCode" v-if="step === 2" autoComplete="off">
        <p><strong>The security code of your reset password has been sent, please check.</strong></p>
        <el-form-item prop="securityCode">
          <el-input size="large" name="securityCode" type="text" autoComplete="off" placeholder="Your email or phone security code."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" class="btn-login" :loading="loading" @click.native.prevent="validSecurityCode">
            Submit this security code
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '@/components/copyright/VaCopyright'
import { Regulars } from '@/tools'

export default {
  name: 'PasswordReset',
  metaInfo: { title: 'Reset your password' },
  components: { Copyright },
  data() {
    const validator = (r, v, c) => {
      if (!v || Regulars.empty(v)) {
        c(new Error('Please enter your email address or phone number.'))
      } else if (!Regulars.email(v) && !Regulars.mobile(v)) {
        c(new Error('Please enter a correct email address or phone number.'))
      } else c()
    }
    return {
      logo: require('@/assets/images/logo.png'),
      step: 1,
      form: { username: 'Example@email.com' },
      rules: {
        username: [{ validator: validator, trigger: 'blur' }],
      },
      loading: false
    }
  },
  methods: {
    validEmailOrPhone() {
      this.$refs['confirmEmail'].validate(v => {
        if (!v) return false
        this.loading = true
        this.sendSecurityCode()
        return true
      })
    },
    validSecurityCode() {
      this.$refs['confirmSecurityCode'].validate(v => {
        if (!v) return false
        this.loading = true
        return true
      })
    },
    sendSecurityCode() {
      this.$message({
        type: 'success',
        duration: 4000,
        message: 'The security code of your reset password has been sent, please check.'
      })
      this.step++
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/views/login--forget";
</style>
