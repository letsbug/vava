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
          inRange: {
            color: [this.colorStart(), this.themeColor]
          }
        }
      })
    }
  },
  methods: {
    colorStart() {
      return Color.convert(`color(${this.themeColor} tint(90%))`)
    },
    init() {
      const _this = this
      if (!_this.chart) _this.chart = echarts.init(_this.$refs['chartMapEl'])

      _this.chart.setOption({
        backgroundColor: '#fff',
        grid: { top: 0, right: 0, bottom: 0, left: 0 },
        tooltip: {
          trigger: 'item',
          formatter: params => params.data ? `${params.name}: ${params.value}` : undefined,
          textStyle: {
            fontSize: 12
          },
          padding: [5, 8],
          extraCssText: 'background-color: rgba(0, 0, 0, .75);' +
            'box-shadow: 0 0px 6px rgba(0, 0, 0, .25);'
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: this.chartData[this.chartData.length - 1].value,
          inRange: {
            color: [this.colorStart(), this.themeColor]
          },
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: false,
          show: false
        },
        series: [{
          type: 'map',
          map: 'world',
          itemStyle: {
            areaColor: '#e9ebf0',
            borderColor: '#e9ebf0'
          },
          data: _this.chartData,
          zoom: 1.06
        }]
      })
    }
  }
}
</script>
