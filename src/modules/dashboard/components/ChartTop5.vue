<template>
  <div ref="chartBarEl" class="chart-detail-wrapper"></div>
</template>

<script>
import mixins from './mixins'
import echarts from 'echarts'

export default {
  mixins: [mixins],
  watch: {
    themeColor() {
      if (!this.chart) return
      this.chart.setOption({
        series: [{
          itemStyle: { color: this.themeColor }
        }]
      })
    }
  },
  methods: {
    calcDataRange() {
      const _data = [...this.chartData].sort((a, b) => b.value - a.value)
      return _data.slice(0, 5)
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$refs['chartBarEl'])

      const _chartData = this.calcDataRange()
      const category = _chartData.map(v => v.name)
      const data = _chartData.map(v => v.value)

      this.chart.setOption({
        grid: {
          top: 76,
          right: 60,
          bottom: 10,
          left: 100
        },
        title: {
          text: 'TOP5 COUNTRIES FOR PV',
          top: 36,
          textStyle: { color: '#6a6d71', align: 'center', fontSize: 14 }
        },
        tooltip: {
          show: false
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          data: category,
          inverse: true
        },
        series: [{
          type: 'bar',
          barWidth: 8,
          label: { show: true, position: 'right', color: '#343a40' },
          itemStyle: { barBorderRadius: 4, color: this.themeColor },
          data
        }]
      })
    }
  }
}
</script>
