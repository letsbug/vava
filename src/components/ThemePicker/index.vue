<template>
  <el-popover placement="top-end" width="270" trigger="click" transition="el-zoom-in-top">
    <template>
      <div class="theme-input">
        <h6>{{ $t('theme.themeStyle') }} <span class="text-muted">&nbsp;&nbsp;coding...</span></h6>
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
          <el-color-picker v-model="styles.color" size="mini" @change="onColorPickerChange" />
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
import { generateColors } from '@/tools/color'

export default {
  data() {
    return {
      template: '',
      colorMap: {
        '#24963e': 'shade-1',
        '#28a745': 'themeColor',
        '#3db058': 'light-1',
        '#53b96a': 'light-2',
        '#69c17d': 'light-3',
        '#7eca8f': 'light-4',
        '#94d3a2': 'light-5',
        '#a9dcb5': 'light-6',
        '#bfe5c7': 'light-7',
        '#d4edda': 'light-8',
        '#eaf6ec': 'light-9'
      },
      stylePresets: ['default', 'light', 'dark'],
      colorPresets: ['#dc3545', '#fe613c', '#ffc107', '#4ec1fa', '#28a745', '#007bff', '#2f54eb', '#6f42c1'],
      normal: { style: 'default', color: '#28a745' },
      styles: {},
      isFirstLoad: true
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  watch: {
    theme: {
      handler() {
        this.setAllColors()
      },
      deep: true
    }
  },
  created() {
    this.styles = { ...this.theme }
    this.getThemeTemplate()
  },
  methods: {
    requestFile(url) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest()
        client.onreadystatechange = () => {
          if (client.readyState !== 4) return

          if (client.status === 200) {
            const urlArr = client.responseURL.split('/')
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            })
          } else reject(new Error(client.statusText))
        }
        client.open('GET', url)
        client.send()
      })
    },
    getThemeTemplate() {
      this.requestFile('./static/css/theme-template.css').then(({ data }) => {
        Object.keys(this.colorMap).forEach(key => {
          const value = this.colorMap[key]
          data = data.replace(new RegExp(key, 'ig'), value)
        })
        this.template = data.replace(/@font-face{[^}]+}/g, '')
          .replace(/\[class\*=" el-icon-"],\[class\^=el-icon-]{[^}]+}/g, '')
          .replace(/\.el-icon[^}]+}/g, '')
        if (this.isFirstLoad) {
          if (this.theme.style !== this.normal.style || this.theme.color !== this.normal.color) {
            this.setAllColors()
          }
        }
      })
    },
    onColorPickerChange(val) {
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
    setAllColors() {
      const newPrimaries = generateColors(this.styles.color)
      let styleTag = document.getElementById('appThemeChalk')
      let cssText = this.template

      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.id = 'appThemeChalk'
        document.head.appendChild(styleTag)
      }

      Object.keys(newPrimaries).forEach(key => {
        cssText = cssText.replace(new RegExp(key, 'g'), newPrimaries[key])
      })
      styleTag.innerHTML = cssText
      console.log(cssText)
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
    border: 0 none !important;
  }
  .el-color-picker__trigger {
    width: $color-picker-size !important;
    height: $color-picker-size !important;
    padding: 0 !important;;
    border-radius: $radius-base !important;
    border: 0 none !important;
    overflow: hidden;
  }
}
</style>
