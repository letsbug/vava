<template>
  <div class="chart-detail-wrapper"></div>
</template>

<script>
import mixins from './mixins'
import echarts from 'echarts'

export default {
  mixins: [mixins],
  props: {
    category: { type: Array, required: true },
    dataType: { type: String, required: false, default: '' }
  },
  methods: {
    areaColor() {
      return `${this.themeColor}30`
    },
    optionsLine() {
      return {
        color: [this.themeColor],
        grid: { top: 40, right: 40, bottom: 40, left: 60 },
        tooltip: Object.assign({}, this.tooltip, {
          trigger: 'axis',
          formatter: params => `${params[0].name}<br />${params[0].marker}` +
            `${params[0].value}${(this.dataType === 'percent' ? ' %' : '')}`
        }),
        xAxis: {
          type: 'category',
          axisLine: { show: false },
          axisTick: { show: false },
          boundaryGap: false,
          data: this.category,
          inverse: true
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: { color: '#e6edf1' }
          }
        },
        axisPointer: {
          lineStyle: { color: '#ced4da' }
        },
        series: [{
          data: this.chartData,
          type: 'line',
          sampling: 'average',
          showSymbol: false,
          smooth: true,
          areaStyle: { color: this.areaColor() }
        }]
      }
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$el)

      this.chart.setOption(this.optionsLine())
    }
  }
}
</script>
