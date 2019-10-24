<template>
  <div :class="{ x2: isMobile && isChartMap }" class="va-panels chart-detail-wrapper" style="transition: none;"></div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import EChartsMixins from './mixins';
import ECharts, { EChartOption } from 'echarts';
import Color from 'css-color-function';
import 'echarts/map/js/world';

@Component({ name: 'ChartDetails' })
export default class extends mixins(EChartsMixins) {
  @Prop({ required: true }) category!: Array<any>;
  @Prop({ required: true, default: false }) isPercent!: boolean;
  @Prop({ required: true, default: false }) isChartMap!: boolean;

  chartTypeChanged: boolean = false;

  @Watch('isChartMap')
  onIsChartMapChange() {
    this.chartTypeChanged = true;
  }

  @Watch('themeColor')
  onThemeColorChange() {
    if (!this.chart) return;

    const options = this.isChartMap
      ? {
          visualMap: {
            inRange: { color: [this.colorStart(), this.themeColor] }
          },
          series: [
            {},
            {
              itemStyle: { color: this.themeColor }
            }
          ]
        }
      : {
          color: [this.themeColor],
          series: [
            {
              areaStyle: { color: this.areaColor() }
            }
          ]
        };

    this.chart.setOption(options as EChartOption<EChartOption.SeriesLine>);
  }

  areaColor() {
    return `${this.themeColor}30`;
  }

  colorStart() {
    return Color.convert(`color(${this.themeColor} tint(90%))`);
  }

  optionsLine() {
    const grid = this.isMobile
      ? { top: 10, right: 0, bottom: 20, left: 0 }
      : { top: 40, right: 40, bottom: 40, left: 60 };

    return {
      color: [this.themeColor],
      grid,
      tooltip: Object.assign({}, this.tooltip, {
        trigger: 'axis',
        formatter: (params: EChartOption.Tooltip.Format[]) =>
          `${params[0].name}<br />${params[0].marker}${params[0].value}${this.isPercent ? '%' : ''}`
      }),
      xAxis: {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        boundaryGap: false,
        data: this.category,
        inverse: true,
        axisLabel: {
          color: '#6a6d71'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { color: '#e6edf1' }
        },
        axisLabel: {
          color: '#6a6d71'
        }
      },
      axisPointer: {
        lineStyle: { color: '#ced4da' }
      },
      series: [
        {
          data: this.chartData,
          type: 'line',
          sampling: 'average',
          showSymbol: false,
          smooth: true,
          areaStyle: { color: this.areaColor() }
        }
      ]
    };
  }

  optionsMap() {
    const category = this.chartData.map(v => v.name).slice(0, 5);

    const title = Object.assign(
      {
        text: 'TOP5 COUNTRIES FOR PV',
        textStyle: { color: '#6a6d71', fontSize: 14 }
      },
      this.isMobile ? { top: '45%', left: 'center' } : { left: '65.6%', top: 20 }
    );
    const geo = Object.assign(
      {
        map: 'world',
        itemStyle: { areaColor: '#e9ebf0', borderColor: '#e9ebf0' }
      },
      this.isMobile ? { top: 0, right: 0, bottom: '60%', left: 0 } : { top: 30, right: '40%', bottom: 30, left: 30 }
    );
    const grid = this.isMobile
      ? { top: '56%', right: 0, bottom: 0, left: 0 }
      : { top: 66, right: 60, bottom: 6, left: '66%', z: 99 };

    return {
      title,
      tooltip: Object.assign({}, this.tooltip, {
        trigger: 'item',
        formatter: (params: EChartOption.Tooltip.Format) =>
          params.data ? `${params.marker}${params.name}: ${params.value}` : undefined
      }),
      visualMap: [
        {
          left: 'right',
          min: 0,
          max: this.chartData[0].value,
          inRange: { color: [this.colorStart(), this.themeColor] },
          text: ['High', 'Low'], // 文本，默认为数值文本
          seriesIndex: 0,
          calculable: false,
          show: false
        }
      ],
      geo,
      grid,
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
          verticalAlign: 'bottom',
          padding: [0, 0, 16, 0]
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
          data: this.chartData.map(v => v.value).slice(0, 5),
          silent: true
        }
      ]
    };
  }

  init() {
    if (!this.chart) this.chart = ECharts.init(this.$el as HTMLDivElement);

    if (this.chartTypeChanged) {
      this.chart.clear();
      this.chart.resize();
      this.chartTypeChanged = false;
    }

    if (this.isChartMap) {
      this.chart.setOption(this.optionsMap() as EChartOption<EChartOption.SeriesMap>);
    } else {
      this.chart.setOption(this.optionsLine() as EChartOption<EChartOption.SeriesLine>);
    }
  }
}
</script>
