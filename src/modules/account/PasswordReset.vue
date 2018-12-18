<template>
  <div class="container-login--password">
    <div class="form-login--password">
      <div class="form-logo">
        <img :src="logo" class="brand" alt="Vava" />
        <h2 class="title">
          Reset your password
        </h2>
      </div>

      <!-- Send & verify email or mobile phone security code -->
      <ElForm v-if="step === 1" ref="formAccount" :model="form" :rules="rules">
        <p><strong>Please enter your account binding email address or phone number.</strong></p>
        <ElFormItem prop="username" style="margin-bottom: 20px;">
          <ElInput
            v-model="form.username" size="large" name="username" type="text"
            placeholder="Your email address or phone number."
          />
        </ElFormItem>
      </ElForm>
      <ElForm v-if="step === 1" ref="formSecurityCode" :model="form" :rules="rules">
        <ElFormItem prop="securityCode">
          <ElInput
            v-model="form.securityCode" size="large" name="securityCode" class="input-security__code"
            type="text" placeholder="Security code"
          >
            <a
              slot="suffix" :class="timing ? 'disabled' : ''" class="link-theme handle-get__code"
              @click.prevent="sendSecurityCode"
            >
              Send code {{ counter ? '(' + counter + ')' : undefined }}
            </a>
          </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton :loading="loading" size="large" type="primary" class="btn-login" @click.prevent="submitSecurityCode">
            Valid security code
          </ElButton>
        </ElFormItem>
      </ElForm>

      <!-- Reset password -->
      <ElForm v-if="step === 2" ref="confirmPassword" :model="form" :rules="rules">
        <p><small>Password must be a combination of Numbers and letters, and between 8 and 16 characters.</small></p>
        <ElFormItem prop="password">
          <ElInput
            v-model="form.password" :type="pwdType.password ? 'password' : 'text'" size="large" name="password"
            placeholder="Password"
          >
            <VaIcon
              slot="suffix" :icon="pwdType.password ? 'mark-eye-close' : 'mark-eye-open'"
              @click.native="pwdType.password = !pwdType.password"
            />
          </ElInput>
        </ElFormItem>
        <ElFormItem prop="confirm">
          <ElInput
            v-model="form.confirm" :type="pwdType.confirm ? 'password' : 'text'" size="large" name="password"
            placeholder="Confirm"
          >
            <VaIcon
              slot="suffix" :icon="pwdType.confirm ? 'mark-eye-close' : 'mark-eye-open'"
              @click.native="pwdType.confirm = !pwdType.confirm"
            />
          </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton :loading="loading" size="large" type="primary" class="btn-login" @click.prevent="resetSubmit">
            Reset password
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>

    <Copyright />
  </div>
</template>

<script>
import Copyright from '@/components/Copyright'
import { Regulars } from '@/tools'
import { validCaptcha, validPassword } from '@/tools/validators'

export default {
  name: 'PasswordReset',
  metaInfo: { title: 'Reset your password' },
  components: { Copyright },
  data() {
    return {
      logo: require('@/assets/images/logo.png'),
      step: 1,
      form: {
        username: 'Example@email.com',
        securityCode: 'ABC123',
        password: '',
        confirm: ''
      },
      rules: {
        username: [{ validator: this.validName, trigger: 'blur' }],
        securityCode: [{ validator: this.validCaptcha, trigger: 'blur' }],
        password: [{ validator: this.validPassword, trigger: 'blur' }],
        confirm: [{ validator: this.validConfirm, trigger: 'blur' }]
      },
      pwdType: {
        password: true,
        confirm: true
      },
      timing: false,
      loading: false,
      counter: 0
    }
  },
  methods: {
    validAccount() {
      let valid = false
      this.$refs['formAccount'].validate(v => { valid = v })
      return valid
    },
    validSecurityCode() {
      let valid = false
      this.$refs['formSecurityCode'].validate(v => { valid = v })
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
      this.step = 2
    },
    resetSubmit() {
      this.$refs['confirmPassword'].validate(v => {
        if (!v) return false
        this.$message.success('Password validate success, do something...')
      })
    },
    validCaptcha,
    validPassword,
    validName(r, v, c) {
      if (!v || Regulars.empty(v)) {
        c(new Error('Please enter your email address or phone number!'))
      } else if (!Regulars.email(v) && !Regulars.mobile(v)) {
        c(new Error('Please enter a correct email address or phone number!'))
      } else c()
    },
    validConfirm(r, v, c) {
      if (!v || Regulars.empty(v)) c(new Error('Please confirm your password!'))
      else if (v !== this.form.password) c(new Error('Password confirmation doesn\'t match the password!'))
      else c()
    }
  }
}
</script>

<style scoped lang="scss">
@import "./styles/login--forget";
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
