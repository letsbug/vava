import color from 'css-color-function'
const formula = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))'
}

export function rgb2Hex(rgb) {
  rgb = rgb.split(',')
  const r = parseInt(rgb[0].split('(')[1])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2].split(')')[0])
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function hex2Rgb(hex, onlyNum) {
  const prefix = onlyNum ? '' : 'rgb('
  const suffix = onlyNum ? '' : ')'
  return prefix +
    parseInt('0x' + hex.slice(1, 3)) + ',' +
    parseInt('0x' + hex.slice(3, 5)) + ',' +
    parseInt('0x' + hex.slice(5, 7)) + suffix
}

export function generateColors(primary) {
  const colors = {}

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  colors['themePrimary'] = hex2Rgb(primary)
  colors['themeOpacityPrimary'] = hex2Rgb(primary, true)
  return colors
}
