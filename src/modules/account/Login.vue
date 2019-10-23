<template>
  <div class="container-login--password">
    <el-form ref="loginForm" :model="form" :rules="rules" class="form-login--password" aria-autocomplete="list">
      <div class="form-logo">
        <brand class="brand text-primary" />
        <h2 class="title">{{ $t('login.title') }}<language-picker class="float-r" class-name="h2" /></h2>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          :placeholder="$t('login.username')"
          type="text"
          size="large"
          name="username"
          @keyup.enter.native="handleLogin"
        >
          <va-icon slot="prefix" icon="people-user" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :placeholder="$t('login.password')"
          :type="password ? 'password' : 'text'"
          size="large"
          name="password"
          @keyup.enter.native="handleLogin"
        >
          <va-icon slot="prefix" icon="mark-lock" />
          <va-icon
            slot="suffix"
            :icon="password ? 'mark-eye-close' : 'mark-eye-open'"
            @click.native="password = !password"
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-tooltip :content="$t('login.rememberDefault')" effect="theme" placement="top-start">
          <el-checkbox v-model="form.remember" :label="$t('login.remember')" class="checkbox-green" name="remember" />
        </el-tooltip>
        <!--<router-link class="forget-link float-r" to="/password">Forgot password?</router-link>-->
        <a class="float-r" @click="userPickerVisible = true">
          {{ $t('login.list') }}
        </a>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" size="large" type="primary" class="btn-login" @click="handleLogin">
          {{ $t('login.login') }}
        </el-button>
      </el-form-item>
    </el-form>

    <user-picker :visible.sync="userPickerVisible" @on-change="fillLoginForm" />

    <copyright />

    <canvas id="appBackDrop" ref="appBackDrop"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Brand, LanguagePicker, UserPicker, Copyright } from '@/components';
import { validAccount, validPassword } from '@/utils/validators';
import { Form } from 'element-ui';
import { IStateUser } from '@/store/modules/user';

@Component({ name: 'Login', components: { Brand, LanguagePicker, UserPicker, Copyright } })
export default class extends Vue {
  // metaInfo: { title: 'Sign in to Vava' }
  backdrop: HTMLElement | undefined;

  form = { username: '', password: '', remember: false };
  rules = {
    username: [{ validator: validAccount, trigger: 'blur' }],
    password: [{ validator: validPassword, trigger: 'blur' }]
  };
  loading = false;
  password = true;
  expires = 7;
  userPickerVisible = false;

  mounted() {
    this.backdrop = this.$refs['appBackDrop'] as HTMLElement;
    document.body.insertBefore(this.backdrop, document.getElementById('app'));
    import(`@/vendor/backdrops/0${Math.floor(Math.random() * 5) + 1}`);
  }

  destroyed() {
    if (this.backdrop) {
      document.body.removeChild(this.backdrop);
    }
    this.loading = false;
  }

  fillLoginForm(user: IStateUser) {
    this.form.username = user.username;
    this.form.password = 'a1234567';
    this.userPickerVisible = false;
    (this.$refs['loginForm'] as Form).validate();
  }
  handleLogin() {
    (this.$refs['loginForm'] as Form).validate(v => {
      if (!v) return false;
      this.loading = true;
      this.$store
        .dispatch('user_login', this.form)
        .then(() => {
          // this.loading = false
          (this.$message as any).closeAll();
          this.$router.push((this.$route.query['redirect'] || '/') + '');
        })
        .catch(() => {
          this.loading = false;
        });
      return true;
    });
  }
}
</script>

<style scoped lang="scss">
@import './styles/login--forget';

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

#appBackDrop {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
