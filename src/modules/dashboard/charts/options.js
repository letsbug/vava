import echarts from 'echarts'

export const tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'none'
  }
}

export const xAxis = {
  type: 'category',
  boundaryGap: false,
  show: false
}

export const yAxis = {
  type: 'value',
  boundaryGap: [0, '100%'],
  show: false
}

export const series = [{
  data: [820, 932, 901, 934, 1290, 1330, 1320],
  type: 'line',
  sampling: 'average',
  showSymbol: false,
  smooth: true,
  areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: 'rgb(255, 158, 68)'
    }, {
      offset: 1,
      color: 'rgb(255, 70, 131)'
    }])
  }
}]
