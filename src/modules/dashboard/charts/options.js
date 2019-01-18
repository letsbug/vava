export const tooltip = {
  formatter: '{b}: {c}',
  textStyle: {
    color: '#343a40',
    fontSize: 12
  },
  padding: [5, 8],
  extraCssText: 'background-color: rgba(255, 255, 255, .86);' +
    'box-shadow: 0 0px 2px rgba(0, 0, 0, .25);'
}

// 地图参数
export const mapOption = {
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}'
  },
  visualMap: {
    left: 'right',
    min: 10,
    max: 1000,
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    },
    text: ['High', 'Low'], // 文本，默认为数值文本
    calculable: false, // default: false
    show: true // default: true
  },
  series: [{
    type: 'map',
    map: 'world',
    itemStyle: {
      normal: {
        areaColor: '#efefef',
        borderColor: '#efefef'
      }
    },
    data: [
      { name: 'China', value: 789 },
      { name: 'United States', value: 789 },
      { name: 'Canada', value: 9 }
    ]
  }]
}
