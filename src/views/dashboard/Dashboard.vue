<template>
  <div class="dashboard">
    <div id="chart" style="height: 100px; width: 100%;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      chart: null,
      sidebar: null
    }
  },
  mounted() {
    this.initChart()

    window.addEventListener('resize', this.chartResizeHandler)

    this.sidebar = document.getElementsByClassName('app-sidebar')[0]
    this.sidebar.addEventListener('transitionend', this.chartResizeHandler)

  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))

      const easingFuncs = {
        elasticIn: function (k) {
          let s;
          let a = 0.1;
          const p = 0.4;
          if (k === 0) { return 0; }
          if (k === 1) { return 1; }
          if (!a || a < 1) { a = 1; s = p / 4; }
          else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
          return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        },

        // 创建弹跳效果
        bounceIn: function (k) {
          return 1 - easingFuncs.bounceOut(1 - k);
        },
        bounceOut: function (k) {
          if (k < (1 / 2.75)) { return 7.5625 * k * k; }
          else if (k < (2 / 2.75)) { return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75; }
          else if (k < (2.5 / 2.75)) { return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375; }
          else { return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375; }
        },
        bounceInOut: function (k) {
          if (k < 0.5) { return easingFuncs.bounceIn(k * 2) * 0.5; }
          return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
        }
      };

      const N_POINT = 30;

      const grids = [];
      const xAxes = [];
      const yAxes = [];
      const series = [];
      const titles = [];
      let count = 0;

      echarts.util.each(easingFuncs, function (easingFunc, name) {
        const data = [];
        for (let i = 0; i <= N_POINT; i++) {
          const x = i / N_POINT;
          const y = easingFunc(x);
          data.push([x, y]);
        }
        grids.push({
          show: true,
          borderWidth: 0,
          backgroundColor: '#fff',
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 2
        });
        xAxes.push({
          type: 'value',
          show: false,
          min: 0,
          max: 1,
          gridIndex: count
        });
        yAxes.push({
          type: 'value',
          show: false,
          min: -0.4,
          max: 1.4,
          gridIndex: count
        });
        series.push({
          name: name,
          type: 'line',
          xAxisIndex: count,
          yAxisIndex: count,
          data: data,
          showSymbol: false,
          animationEasing: name,
          animationDuration: 1000
        });
        titles.push({
          textAlign: 'left',
          text: name,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          }
        });
        count++;
      });

      echarts.util.each(grids, function (grid, idx) {
        grid.left = ((idx % count) / count * 100) + '%';
        grid.top = 0;
        grid.width = (1 / count * 100 - 1) + '%';
        grid.height = 90 + '%';

        titles[idx].left = parseFloat(grid.left) + '%';
        titles[idx].top = 0;
      });

      const option = {
        title: titles.concat(),
        grid: grids,
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
        xAxis: xAxes,
        yAxis: yAxes,
        series: series
      };

      this.chart.setOption(option)
    },

    chartResizeHandler() {
      this.chart.resize()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.chartResizeHandler)
    this.sidebar.removeEventListener('transitionend', this.chartResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
}
</script>

<style scoped lang="scss">
  @import "../../styles/pages/dashboard";
</style>
