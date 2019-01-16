<template>
  <div class="panel-card-chart"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'PanelChart',
  props: {
    title: { type: String, required: false, default: null },
    type: { type: String, required: true },
    category: { type: Array, required: true },
    data: { type: Array, required: true }
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
        series: [{
          areaStyle: {
            color: this.themeColor
          }
        }]
      })
    }
  },
  created() {
    const typesMap = ['line']
    if (!typesMap.includes(this.type)) throw new Error('The \'type\' props must be in ' + typesMap)
  },
  mounted() {
    this.init()
    this.resizeHandler = () => {
      if (this.chart) this.chart.resize()
    }
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    init() {
      this.chart = echarts.init(this.$el, 'shine')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          position: (pt, params, dom, rect, size) =>
            ((pt[0] + size.contentSize[0]) < this.width)
              ? [pt[0], '10%']
              : [pt[0] - size.contentSize[0], '10%'],
          textStyle: {
            color: '#343a40'
          },
          extraCssText: 'background-color: rgba(255, 255, 255, .7);' +
            'box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3)'
        },
        grid: {
          left: 0,
          right: 0
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
            color: this.themeColor
          }
        }]
      })
    }
  }
}
</script>

<style scoped lang="scss">
$chart-height:    80px;

.panel-card-chart {
  height: $chart-height;
  overflow: hidden;
}
</style>
