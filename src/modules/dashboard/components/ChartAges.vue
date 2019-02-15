<template>
  <div class="va-panels chart-detail-wrapper"></div>
</template>

<script>
import mixins from './mixins'
import echarts from 'echarts'
import Color from 'css-color-function'

export default {
  mixins: [mixins],
  watch: {
    themeColor() {
      if (!this.chart) return

      this.chart.setOption({
        color: [
          this.calcColors(this.themeColor)
        ],
        series: [{
          itemStyle: {
            borderColor: this.themeColor
          },
          emphasis: {
            itemStyle: {
              color: this.calcColors(this.themeColor)
            }
          }
        }]
      })
    }
  },
  methods: {
    calcColors(tar) {
      return Color.convert(`color(${tar} tint(80%))`)
    },
    init() {
      if (!this.chart) this.chart = echarts.init(this.$el)

      const grid = this.isMobile
        ? { top: 70, right: 0, bottom: 20, left: 0 }
        : { top: 60, right: 0, bottom: 20, left: 50 }
      const legend = Object.assign(
        { itemGap: 20, data: ['male', 'female', 'unknown'] },
        this.isMobile
          ? { top: 30, right: 'auto', left: 0 }
          : { top: 0, right: 0, left: 'auto' }
      )

      this.chart.setOption({
        title: {
          text: 'AGE & GENDER DISTRIBUTION',
          textStyle: {
            color: '#6a6d71',
            fontSize: 14
          }
        },
        grid,
        tooltip: Object.assign({}, this.tooltip, {
          trigger: 'axis'
        }),
        color: [
          this.calcColors(this.themeColor),
          this.calcColors('#d90378'),
          this.calcColors('#6a6d71')
        ],
        legend,
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#e6edf1'
            }
          },
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
        dataset: {
          dimensions: ['section', 'male', 'female', 'unknown'],
          source: this.chartData
        },
        series: [
          {
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              barBorderRadius: 3,
              borderWidth: 1,
              borderColor: this.themeColor
            },
            emphasis: {
              itemStyle: {
                color: this.calcColors(this.themeColor)
              }
            },
            silent: true
          },
          {
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              barBorderRadius: 3,
              borderWidth: 1,
              borderColor: '#d90378'
            },
            emphasis: {
              itemStyle: {
                color: this.calcColors('#d90378')
              }
            },
            silent: true,
            barGap: this.isMobile ? '16%' : '50%'
          },
          {
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              barBorderRadius: 3,
              borderWidth: 1,
              borderColor: '#adb5bd'
            },
            emphasis: {
              itemStyle: {
                color: this.calcColors('#6a6d71')
              }
            },
            silent: true
          }
        ]
      })
    }
  }
}
</script>
