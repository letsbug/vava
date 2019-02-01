<template>
  <div class="chart-detail-wrapper"></div>
</template>

<script>
import mixins from './mixins'
import echarts from 'echarts'

export default {
  mixins: [mixins],
  props: {
    category: { type: Array, required: true }
  },
  methods: {
    areaColor() {
      return `${this.themeColor}30`
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$el)

      this.chart.setOption({
        color: [
          this.themeColor
        ],
        xAxis: {
          type: 'category',
          data: this.category
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.chartData,
          type: 'line',
          sampling: 'average',
          showSymbol: false,
          smooth: true,
          areaStyle: {
            color: this.areaColor()
          }
        }]
      })
    }
  }
}
</script>
