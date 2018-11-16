<template>
  <el-dropdown trigger="click" @command="chooseTheme" :show-timeout="100" style="float: left;">
    <a class="va-nav-item hidden-xs-only">
      <va-icon icon="thing-shirt"></va-icon>
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="default">{{ $t('theme.default') }}</el-dropdown-item>
      <el-dropdown-item command="light">{{ $t('theme.light') }}</el-dropdown-item>
      <el-dropdown-item command="dark">{{ $t('theme.dark') }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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
