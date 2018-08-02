<template>
  <div class="app-panel count-panel">
    <p class="title">total visits</p>
    <h2 class="text-center counter" :class="(today-yestoday>0)?'text-primary':'text-red'">4987</h2>
    <div class="chart" id="totalChart">chart viewer</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/infographic'

export default {
  name: "CountPanel",
  props: {
    ctype: { type: String, default: 'bar', required: false },
    xAxis: { type: Object, default: {}, required: true },
    yAxis: { type: Object, default: {}, required: true },
    datas: { type: Array, default: () => [], required: false }
  },
  data() { return {
    series: [{
      type: this.ctype,
      data: this.datas,
    }],
    today: 99,
    yestoday: 90,
    option: {
      title: '',
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
      xAxis: [],
      yAxis: [],
      series: []
    }
  } }
}
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .count-panel {
    position: relative;

    .title {
      margin-top: 0;
    }

    .counter {
      position: absolute;
      right: $spacer-x;
      top: $spacer-y;
      margin: 0;
    }

    .chart {
      width: 80px;
      height: 40px;
      background-color: red;
      margin: 0 auto;
    }
  }
</style>
