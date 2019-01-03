<template>
  <el-dropdown trigger="click" @command="pickLang">
    <a :class="className ? className : null" class="va-lang-picker">
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
export default {
  props: {
    className: { type: String, default: null, required: false }
  },
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
