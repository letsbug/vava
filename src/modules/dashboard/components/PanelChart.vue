<template>
  <div class="panel-card-chart"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/shine')
import { tooltip } from '../charts/options'

export default {
  name: 'PanelChart',
  props: {
    title: { type: String, required: false, default: null },
    type: { type: String, required: true },
    category: { type: Array, required: true },
    data: { type: Array, required: true, default: () => [] }
  },
  data() {
    return {}
  },
  computed: {
    width() {
      return this.$el.getBoundingClientRect().width
    },
    themeColor() {
      return this.$store.getters.theme.color
    }
  },
  watch: {
    themeColor() {
      if (!this.chart) return
      this.chart.setOption({
        color: this.themeColor,
        series: [{
          areaStyle: {
            color: this.areaColor()
          }
        }]
      })
    }
  },
  created() {
    const typesMap = ['line', 'bar']
    if (!typesMap.includes(this.type)) throw new Error('The \'type\' props must be in ' + typesMap)
  },
  mounted() {
    this.draw()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.resizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    areaColor() {
      return `${this.themeColor}30`
    },
    init() {
      this.chart = echarts.init(this.$el, 'shine')

      const _tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        position: (pt, params, dom, rect, size) =>
          ((pt[0] + size.contentSize[0]) < this.width)
            ? [pt[0] + 6, 9]
            : [pt[0] - size.contentSize[0] - 6, 9]
      }

      this.chart.setOption({
        color: [this.themeColor],
        tooltip: Object.assign({}, _tooltip, tooltip),
        grid: {
          top: 16,
          right: 7,
          bottom: 0,
          left: 7
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.category,
          show: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          show: false
        },
        series: [{
          data: this.data,
          type: 'line',
          sampling: 'average',
          showSymbol: false,
          smooth: true,
          areaStyle: {
            color: this.areaColor()
          }
        }]
      })
    },
    draw() {
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
$chart-height:    48px;

.panel-card-chart {
  height: $chart-height;
  margin: 0 -7px;
  overflow: hidden;
}
</style>
