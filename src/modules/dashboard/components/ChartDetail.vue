<template>
  <div ref="chartEl" class="va-panel panel-detail"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/world'
import Color from 'css-color-function'

export default {
  props: {
    chartData: { type: Array, required: true }
  },
  data() {
    return {}
  },
  computed: {
    colorEnd() {
      return this.$store.getters.theme.color
    }
  },
  watch: {
    colorEnd() {
      if (!this.chart) return
      this.chart.setOption({
        visualMap: {
          inRange: {
            color: [this.colorStart(), this.colorEnd]
          }
        }
      })
    }
  },
  mounted() {
    if (this.chart) this.draw()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.resizeHandler)

    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    colorStart() {
      return Color.convert(`color(${this.colorEnd} tint(90%))`)
    },
    init() {
      const _this = this
      if (!_this.chart) _this.chart = echarts.init(_this.$refs['chartEl'])

      const colorStart = this.colorStart()
      const colorEnd = this.colorEnd

      console.log(colorStart, colorEnd)

      _this.chart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
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
          max: 60000,
          inRange: {
            color: [colorStart, colorEnd]
          },
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: false,
          show: false
        },
        series: [{
          type: 'map',
          map: 'world',
          itemStyle: {
            normal: {
              areaColor: '#e9ebf0',
              borderColor: '#e9ebf0'
            }
          },
          data: _this.chartData
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

<style scoped lang="scss">
@import "~@/styles/_variables";

.panel-detail {
  height: 400px;
}
</style>
