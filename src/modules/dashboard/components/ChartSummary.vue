<template>
  <div class="panel-card">
    <h6 class="panel-card-title text-secondary">
      <span>{{ title }}</span>
      <a class="handle-tab-detail">
        <i class="el-icon-arrow-right float-r handle-tab-detail"></i>
      </a>
    </h6>
    <i-count-to
      :start-val="0" :end-val="dataType === 'percent' ? total * 100 : total"
      :prefix="prefix" :suffix="suffix" :decimals="decimals"
      :duration="animateDuration" :class="totalSpanClass" class="panel-card-total"
    />
    <div v-if="data" ref="chartEl" class="panel-card-chart"></div>
    <!--<div class="panel-card-additional">{{ $t('dashboard.average') + countries }}</div>-->
  </div>
</template>

<script>
import ICountTo from 'vue-count-to'
import echarts from 'echarts'
import { tooltip } from '../charts/options'

export default {
  components: { ICountTo },
  props: {
    title: { type: String, required: true },
    category: { type: Array, required: true },
    total: { type: Number, required: false, default: undefined },
    data: { type: Array, required: false, default: null },
    dataType: { type: String, required: false, default: 'normal' },
    prefix: { type: String, required: false, default: '' },
    suffix: { type: String, required: false, default: '' },
    decimals: { type: Number, required: false, default: 0 }
  },
  data() {
    return {
      animateDuration: 1500
    }
  },
  computed: {
    width() {
      return this.$refs['chartEl'].getBoundingClientRect().width
    },
    themeColor() {
      return this.$store.getters.theme.color
    },
    totalSpanClass() {
      return {
        'text-primary': !this.data,
        'null-data': !this.data
      }
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
      this.chart = echarts.init(this.$refs['chartEl'])

      const _tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        // 跟随不遮挡鼠标，始终在可视区域内
        position: (pt, params, dom, rect, size) => ((pt[0] + size.contentSize[0]) < this.width)
          ? [pt[0] + 7, 10]
          : [pt[0] - size.contentSize[0] - 7, 10],
        formatter: `{b}: {c}${this.dataType === 'percent' ? '%' : ''}`
      }

      this.chart.setOption({
        color: [this.themeColor],
        tooltip: Object.assign({}, tooltip, _tooltip),
        grid: {
          top: 12,
          right: 7,
          bottom: 7,
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
      if (!this.data) return

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

.panel-card {
  height: 100%;
  padding: $spacer-lg;
  margin-bottom: $spacer-base;
  background-color: $color-white;
  border-radius: $radius-base;
  box-shadow: $shadow-base;
  position: relative;
}

.panel-card-title {
  margin-top: 0;
  margin-bottom: $spacer-sm;
  text-transform: uppercase;
}

.panel-card-total {
  font-size: $font-size-h1;
  margin: 0;

  &.null-data {
    display: block;
    height: 78px;
    line-height: 78px;
    text-align: center;
    font-size: $font-size-h1 * 1.5;
  }
}

.panel-card-additional {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  left: $spacer-lg;
  bottom: $spacer-lg;
}

.panel-card-chart {
  height: 49px;
  margin-top: -7px;
  margin-left: -7px;
  margin-right: -7px;
  overflow: hidden;
  position: relative;
  bottom: -7px;
}
</style>
