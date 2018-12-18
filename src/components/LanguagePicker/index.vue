<template>
  <ElDropdown trigger="click" @command="pickLang">
    <span class="lang-picker">
      <VaIcon icon="action-translate" />
    </span>
    <ElDropdownMenu slot="dropdown">
      <ElDropdownItem :disabled="language === 'zh'" command="zh">
        中文
      </ElDropdownItem>
      <ElDropdownItem :disabled="language === 'en'" command="en">
        English
      </ElDropdownItem>
    </ElDropdownMenu>
  </ElDropdown>
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

<style scoped>
.lang-picker {
  cursor: pointer;
}
</style>
