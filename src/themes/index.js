import { xhr } from '@/apis/xhr'
import { generateColors } from '@/tools/color'
import store from '@/store'

function getTemplate(data) {
  const colorMap = {
    '#24963e': 'shade-1',
    '#28a745': 'themePrimary',
    '#3db058': 'light-1',
    '#53b96a': 'light-2',
    '#69c17d': 'light-3',
    '#7eca8f': 'light-4',
    '#94d3a2': 'light-5',
    '#a9dcb5': 'light-6',
    '#bfe5c7': 'light-7',
    '#d4edda': 'light-8',
    '#eaf6ec': 'light-9',
    '40,167,69': 'themeOpacityPrimary'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  data = data.replace(/@font-face{[^}]+}/g, '')
    .replace(/\[class\*=" el-icon-"],\[class\^=el-icon-]{[^}]+}/g, '')
    .replace(/\.el-icon[^}]+}/g, '')
  return data
}

class Theme {
  constructor() {
    this.themes = { ...store.getters.theme }
    this.normal = {
      style: 'normally',
      color: '#28a745'
    }
    xhr('./static/css/theme-template.min.css').then(({ data }) => {
      this.template = getTemplate(data)
      // if (this.themes.style !== this.normal.style || this.themes.color !== this.normal.color) {
      //   this.set(this.themes)
      // }
      // this.style(this.themes.style)
      this.set(this.themes)
    })
  }
  color(color) {
    const newPrimaries = generateColors(color)
    let styleTag = document.getElementById('appThemeChalk')
    let cssText = this.template

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'appThemeChalk'
      document.head.appendChild(styleTag)
    }

    Object.keys(newPrimaries).forEach(key => {
      const reg = new RegExp(key, 'g')
      cssText = cssText.replace(reg, newPrimaries[key])
    })

    styleTag.innerHTML = cssText
  }
  style(style) {
    const body = document.body
    if (Array.from(body.classList).includes(style)) return
    body.className = `theme-${style}`
  }
  set(themes) {
    this.color(themes.color)
    this.style(themes.style)
    store.dispatch('app_theme_set', themes)
  }
  get() {
    return this.themes
  }
}

const theme = new Theme()
window.theme = theme
