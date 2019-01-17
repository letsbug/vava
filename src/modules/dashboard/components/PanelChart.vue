<template>
  <div class="panel-card-chart"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/shine')

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
    this.init()
    this.resizeHandler = () => {
      if (this.chart) this.chart.resize()
    }

    window.addEventListener('resize', this.resizeHandler)

    this.sidebar = document.querySelector('.va-side-wrapper')
    this.sidebar && this.sidebar.addEventListener('transitionend', this.resizeHandler)
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

      this.chart.setOption({
        color: [this.themeColor],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          position: (pt, params, dom, rect, size) =>
            ((pt[0] + size.contentSize[0]) < this.width)
              ? [pt[0], 2]
              : [pt[0] - size.contentSize[0], 2],
          textStyle: {
            color: '#343a40',
            fontSize: 12
          },
          padding: [3, 8],
          extraCssText: 'background-color: rgba(255, 255, 255, .86);' +
            'box-shadow: 0 0px 2px rgba(0, 0, 0, .25);'
        },
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
          type: this.type,
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

<style scoped lang="scss">
@import "~@/styles/_variables";

$chart-height:    46px;

.panel-card-chart {
  margin-left: -7px;
  margin-right: -7px;
  height: $chart-height;
  overflow: hidden;
}
</style>
