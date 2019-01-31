<template>
  <div ref="chartBarEl" class="chart-wrapper"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    chartData: { type: Array, required: true }
  },
  computed: {
    themeColor() {
      return this.$store.getters.theme.color
    }
  },
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
      console.log('-------------------------------------------------------')
      const _data = [...this.chartData].sort((a, b) => b.value - a.value)
      console.log(_data)
      return _data.slice(0, 5)
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$refs['chartBarEl'])

      const _chartData = this.calcDataRange()
      const category = _chartData.map(v => v.name)
      const data = _chartData.map(v => v.value)

      console.log(category, data)

      this.chart.setOption({
        grid: {
          left: 100
        },
        title: {
          text: 'TOP5 COUNTRIES FOR PV',
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
    },
    draw() {
      if (!this.chartData) return

      this.init()
      this.resizeHandler = () => {
        if (this.chart) this.chart.resize()
      }

      window.addEventListener('resize', this.resizeHandler)
      this.sidebar = document.querySelector('.va-side-wrapper')
      this.sidebar && this.sidebar.addEventListener('transitionend', this.resizeHandler)
    }
  }
}
</script>
