<template>
  <ElDropdown :show-timeout="100" trigger="click" style="float: left;" @command="chooseTheme">
    <a class="va-nav-item hidden-xs-only">
      <VaIcon icon="thing-shirt" />
    </a>
    <ElDropdownMenu slot="dropdown">
      <ElDropdownItem command="default">
        {{ $t('theme.default') }}
      </ElDropdownItem>
      <ElDropdownItem command="light">
        {{ $t('theme.light') }}
      </ElDropdownItem>
      <ElDropdownItem command="dark">
        {{ $t('theme.dark') }}
      </ElDropdownItem>
    </ElDropdownMenu>
  </ElDropdown>
</template>

<script>
export default {
  name: 'ThemePicker',
  data() {
    return {}
  },
  methods: {
    chooseTheme(tar) {
      console.log('choose theme: ' + tar)
    }
  }
}
</script>
