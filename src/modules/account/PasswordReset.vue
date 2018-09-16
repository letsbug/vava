<template>
  <div class="container-login--password">
    <div class="form-login--password">
      <div class="form-logo">
        <img class="brand" :src="logo" alt="Vava">
        <h2 class="title">Reset your password</h2>
      </div>
      <el-form ref="formAccount" v-if="step === 1" autoComplete="off" aria-autocomplete="list" :model="form" :rules="rules">
        <p><strong>Please enter your account binding email address or phone number.</strong></p>
        <el-form-item prop="username">
          <el-input size="large" name="username" type="text" v-model="form.username"
                    placeholder="Your email address or phone number."></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="formSecurityCode" v-if="step === 1" autoComplete="off" aria-autocomplete="list" :model="form" :rules="rules">
        <el-form-item prop="securityCode">
          <el-input size="large" name="securityCode" class="input-security__code" type="text"
                    v-model="form.securityCode" placeholder="Security code">
            <a slot="suffix" class="link-theme handle-get__code" :class="timing ? 'disabled' : ''" @click.prevent="sendSecurityCode">
              Send code {{counter ? '(' + counter + ')' : undefined}}
            </a>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" class="btn-login" :loading="loading" @click.prevent="submitSecurityCode">
            Valid security code
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <copyright></copyright>
  </div>
</template>

<script>
import Copyright from '@/components/copyright/VaCopyright'
import { Validators, Regulars } from '@/tools'

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
      form: {
        username: 'Example@email.com',
        securityCode: '',
        password: '',
        confirm: ''
      },
      rules: {
        username: [{ validator: validator, trigger: 'blur' }],
        securityCode: [{ validator: Validators.captcha, trigger: 'blur' }]
      },
      timing: false,
      loading: false,
      counter: 0
    }
  },
  methods: {
    validAccount() {
      let valid = false
      this.$refs['formAccount'].validate(v => valid = v)
      return valid
    },
    validSecurityCode() {
      let valid = false
      this.$refs['formSecurityCode'].validate(v => valid = v)
      return valid
    },
    timingSecurityBtn() {
      this.counter = 60
      this.timing = true
      const timer = setInterval(() => {
        this.counter--
        if (this.counter === 0) {
          clearInterval(timer)
          this.timing = false
        }
      }, 1000)
    },
    sendSecurityCode() {
      if (!this.validAccount() || this.timing) return false
      this.timingSecurityBtn()
    },
    submitSecurityCode() {
      if (!this.validAccount() || !this.validSecurityCode()) return false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/views/login--forget";
$handle-get__code-width:  120px;

.el-input--suffix.input-security__code {
  & /deep/ .el-input__inner {
    padding-right: $handle-get__code-width!important;
  }

  .handle-get__code {
    margin-right: 4px;
  }
}
</style>
