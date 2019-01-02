<template>
  <el-dropdown trigger="click" style="float:left;" @command="pickLang">
    <a class="va-nav-item va-lang-picker">
      <va-icon icon="action-translate" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// import Cookie from 'js-cookie'

export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    pickLang(target) {
      this.$i18n.locale = target
      this.$store.dispatch('app_language_set', target)
    }
  }
}
</script>
