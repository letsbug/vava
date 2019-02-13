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
        },
        series: [{}, {
          itemStyle: { color: this.themeColor }
        }]
      })
    }
  },
  methods: {
    colorStart() {
      return Color.convert(`color(${this.themeColor} tint(90%))`)
    },
    calcBarData() {
      return this.chartData.map(v => v.value).slice(0, 5)
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$refs['chartMapEl'])

      const color = [this.colorStart(), this.themeColor]
      const category = this.chartData.map(v => v.name).slice(0, 5)

      this.chart.setOption({
        title: {
          text: 'TOP5 COUNTRIES FOR PV',
          textStyle: { color: '#6a6d71', fontSize: 14 },
          left: '65.6%',
          top: 15
        },
        tooltip: Object.assign({}, this.tooltip, {
          trigger: 'item',
          formatter: params => params.data ? `${params.name}: ${params.value}` : undefined
        }),
        visualMap: {
          left: 'right',
          min: 0,
          max: this.chartData[0].value,
          inRange: { color },
          text: ['High', 'Low'], // 文本，默认为数值文本
          seriesIndex: 0,
          calculable: false,
          show: false
        },
        geo: {
          map: 'world',
          itemStyle: { areaColor: '#e9ebf0', borderColor: '#e9ebf0' },
          top: 30,
          right: this.isMobile ? 0 : '40%',
          bottom: 30,
          left: 30
        },
        grid: [
          { top: 66, right: 60, bottom: 10, left: '66%', z: 99 }
        ],
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            fontSize: 13,
            inside: true,
            margin: 0,
            padding: [0, 0, 50, 0]
          },
          data: category,
          inverse: true
        },
        series: [
          {
            type: 'map',
            data: this.chartData,
            geoIndex: 0
          },
          {
            type: 'bar',
            barWidth: 6,
            label: { show: true, position: 'right', color: '#343a40' },
            itemStyle: { barBorderRadius: 3, color: this.themeColor },
            data: this.calcBarData(),
            silent: true
          }
        ]
      })
    }
  }
}
</script>
