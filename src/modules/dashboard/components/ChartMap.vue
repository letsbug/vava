<template>
  <div ref="chartMapEl" class="chart-detail-wrapper"></div>
</template>

<script>
import mixins from './mixins'
import echarts from 'echarts'
import 'echarts/map/js/world'
import Color from 'css-color-function'

export default {
  mixins: [mixins],
  watch: {
    themeColor() {
      if (!this.chart) return
      this.chart.setOption({
        visualMap: {
          inRange: { color: [this.colorStart(), this.themeColor] }
        }
      })
    }
  },
  methods: {
    colorStart() {
      return Color.convert(`color(${this.themeColor} tint(90%))`)
    },
    calcBarData() {
      return this.chartData.map(v => v.value).sort((a, b) => b - a).slice(0, 5)
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$refs['chartMapEl'])

      this.chart.setOption({
        backgroundColor: '#fff',
        grid: Object.assign({}, this.grid, {
          top: 0, right: 0, bottom: 0, left: this.isMobile ? 0 : '62%',
          shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 10
        }),
        tooltip: Object.assign({}, this.tooltip, {
          trigger: 'item',
          formatter: params => params.data ? `${params.name}: ${params.value}` : undefined
        }),
        visualMap: {
          left: 'right',
          min: 0,
          max: this.chartData[this.chartData.length - 1].value,
          inRange: { color: [this.colorStart(), this.themeColor] },
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: false,
          show: false
        },
        series: [
          {
            type: 'map',
            map: 'world',
            itemStyle: { areaColor: '#e9ebf0', borderColor: '#e9ebf0' },
            data: this.chartData,
            top: 0,
            right: this.isMobile ? 0 : '38%',
            bottom: 0,
            left: 0
          },
          {
            type: 'bar',
            barWidth: 8,
            label: { show: true, position: 'right', color: '#343a40' },
            itemStyle: { barBorderRadius: 4, color: this.themeColor },
            data: this.calcBarData()
          }
        ]
      })
    }
  }
}
</script>
