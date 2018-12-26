<template>
  <el-dropdown trigger="click" @command="pickLang">
    <span class="lang-picker">
      <va-icon icon="action-translate" />
    </span>
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

<style scoped lang="scss">
@import "~@/styles/_variables";

.lang-picker {
  cursor: pointer;
  transition: $transition-color;

  &:hover {
    color: $color-theme;
  }
}
</style>
