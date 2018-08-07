<template>
  <div class="app-panel count-panel">
    <p class="title">total visits</p>
    <h2 class="text-center counter" :class="(today-yestoday>0)?'text-primary':'text-red'">4987</h2>
    <div class="chart" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/infographic'

export default {
  name: "CountPanel",
  props: {
    id: { type: String, default: 'totalChart' },
    stype: { type: String, default: 'line', required: false },
    xAxis: { type: Object, default: {}, required: true },
    yAxis: { type: Object, default: {}, required: true },
    datas: { type: Array, default: () => [], required: false }
  },
  data() { return {
    chart: null,
    tooltip: {},
    today: 99,
    yestoday: 90
  } },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.id), 'infographic')
      const option = {
        title: null,
        yAxis: Object.assign(this.yAxis, { show: false }),
        xAxis: Object.assign(this.xAxis, { show: false }),
        series: [{
          name: null,
          type: this.stype,
          data: this.datas
        }]
      }
      this.chart.setOption(option)
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .count-panel {
    position: relative;

    .title {
      margin-top: 0;
      margin-bottom: $spacer-y * 2;
    }

    .counter {
      position: absolute;
      right: $spacer-x;
      top: $spacer-y;
      margin: 0;
    }

    .chart {
      width: 100%;
      height: 160px;
      margin: 0 auto;
    }
  }
</style>
