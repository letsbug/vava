<template>
  <el-popover placement="top-end" width="270" trigger="click" transition="el-zoom-in-top">
    <template>
      <div class="theme-input">
        <h6>{{ $t('theme.themeStyle') }}</h6>
        <el-radio-group v-model="styles.style" class="text-center">
          <el-radio v-for="sty in stylePresets" :key="sty" :label="sty">{{ $t(`theme.styles.${sty}`) }}</el-radio>
        </el-radio-group>
      </div>
      <div class="theme-input">
        <h6>{{ $t('theme.themeColor') }}</h6>
        <div class="text-center" style="height: 20px;">
          <span
            v-for="pre in colorPresets" :key="pre" class="color-picker" :style="`background-color:${pre}`"
            @click="styles.color = pre"
          >
            <i v-if="pre === styles.color" class="el-icon-check"></i>
          </span>
          <el-color-picker v-model="styles.color" size="mini" @change="changeColor" />
        </div>
      </div>
      <hr />
      <div class="theme-input" style="text-align: right">
        <el-button size="mini" @click="restoreDefault">{{ $t('theme.actions.default') }}</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit">{{ $t('theme.actions.confirm') }}</el-button>
      </div>
    </template>
    <a slot="reference" class="va-nav-item hidden-xs-only">
      <va-icon icon="thing-shirt" />
    </a>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      normal: { style: 'default', color: '#28a745' },
      styles: {},
      origin: {},
      stylePresets: [
        'default',
        'light',
        'dark'
      ],
      colorPresets: [
        '#dc3545',
        '#fe613c',
        '#ffc107',
        '#4ec1fa',
        '#28a745',
        '#007bff',
        '#2f54eb',
        '#6f42c1'
      ],
      primaryList: []
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  watch: {
    theme: {
      handler: function() {
        this.setAllCSS()
      },
      deep: true
    }
  },
  mounted() {
    this.origin = { ...this.normal }
    this.styles = { ...this.theme }
    this.setAllCSS()
  },
  methods: {
    changeColor(val) {
      if (!val) this.styles.color = this.colorPresets[4]
    },
    handleSubmit() {
      this.origin = { ...this.theme }
      this.$store.dispatch('app_theme_set', this.styles)
      this.handleHideThemePicker()
    },
    restoreDefault() {
      this.origin = { ...this.theme }
      this.styles = { ...this.normal }
      this.$store.dispatch('app_theme_set', this.normal)
      this.handleHideThemePicker()
    },
    handleHideThemePicker() {
      document.documentElement.click()
    },
    setAllCSS() {
      const current = this.origin.color
      const reg = new RegExp(current + '', 'ig')
      const origins = document.head.querySelectorAll('style')
      origins.forEach(stl => {
        stl.innerHTML = stl.innerHTML.replace(reg, this.styles.color)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

$color-picker-size: 20px;

hr {
  margin: $spacer-base 0;
  border-width: 0;
  border-style: none;
  border-top: solid $border-default-width $color-gray-300;
}
h6 {
  margin-top: 0;
  margin-bottom: $spacer-base;
}
.theme-input + .theme-input {
  margin-top: $spacer-lg;
}
.color-picker {
  display: inline-block;
  width: $color-picker-size;
  height: $color-picker-size;
  border-radius: $radius-base;
  text-align: center;
  line-height: $color-picker-size;
  color: $color-white;
  vertical-align: top;
  cursor: pointer;

  & + .color-picker {
    margin-left: 7px;
  }
}
/deep/ {
  .el-radio {
    font-weight: normal;
  }
  .el-color-picker {
    margin-left: 3px;
  }
  .el-color-picker__color, .el-color-picker__trigger {
  }
  .el-color-picker__trigger {
    width: $color-picker-size;
    height: $color-picker-size;
    padding: 0;
    border-radius: $radius-base;
    border: 0 none;
    overflow: hidden;
  }
}
</style>
