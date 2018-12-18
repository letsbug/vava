<template>
  <el-dropdown :show-timeout="100" trigger="click" style="float: left;" @command="chooseTheme">
    <a class="va-nav-item hidden-xs-only">
      <va-icon icon="thing-shirt" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="default">
        {{ $t('theme.default') }}
      </el-dropdown-item>
      <el-dropdown-item command="light">
        {{ $t('theme.light') }}
      </el-dropdown-item>
      <el-dropdown-item command="dark">
        {{ $t('theme.dark') }}
      </el-dropdown-item>
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
