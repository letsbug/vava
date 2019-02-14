<template>
  <div class="va-panels panel-card" :class="{ 'border-primary': active && !isMobile, 'text-primary': active && isMobile }">
    <h6 v-if="!isMobile" class="panel-card-title" :class="active ? 'text-primary' : 'text-secondary'">
      <span>{{ title }}</span>
      <a class="handle-tab-detail" :class="{ 'text-primary': active }">
        <i class="el-icon-arrow-right float-r handle-tab-detail"></i>
      </a>
    </h6>
    <i-count-to
      :start-val="0" :end-val="dataType === 'percent' ? total * 100 : total"
      :prefix="prefix" :suffix="suffix" :decimals="decimals"
      :duration="animateDuration" :class="totalSpanClass" class="panel-card-total"
    />
    <h6 v-if="isMobile" class="panel-card-title is-mobile" :class="active ? 'text-primary' : 'text-secondary'">{{ title }}</h6>
    <div v-if="!isMobile && chartData" ref="chartEl" class="panel-card-chart"></div>
  </div>
</template>

<script>
import mixins from './mixins'
import ICountTo from 'vue-count-to'
import echarts from 'echarts'

export default {
  components: { ICountTo },
  mixins: [mixins],
  props: {
    title: { type: String, required: true },
    category: { type: Array, required: true },
    total: { type: Number, required: false, default: undefined },
    // Overwrite mixins
    chartData: { type: Array, required: false, default: null },
    dataType: { type: String, required: false, default: 'normal' },
    prefix: { type: String, required: false, default: '' },
    suffix: { type: String, required: false, default: '' },
    decimals: { type: Number, required: false, default: 0 },
    active: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      animateDuration: 1500
    }
  },
  computed: {
    totalSpanClass() {
      return {
        'text-primary': !this.chartData && !this.isMobile,
        'null-data': !this.chartData && !this.isMobile,
        'text-center': this.isMobile
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
  methods: {
    areaColor() {
      return `${this.themeColor}30`
    },
    init() {
      if (this.isMobile) return

      if (!this.chart) this.chart = echarts.init(this.$refs['chartEl'])

      this.chart.setOption({
        color: [
          this.themeColor
        ],
        tooltip: {
          show: false
        },
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
          show: false,
          inverse: true
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          show: false
        },
        series: [{
          data: this.chartData,
          type: 'line',
          sampling: 'average',
          showSymbol: false,
          smooth: true,
          areaStyle: { color: this.areaColor() }
        }]
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.panel-card {
  padding: $spacer-lg;
  position: relative;
  cursor: pointer;
  transition: $transition-all;
}

.panel-card-title {
  margin-top: 0;
  margin-bottom: $spacer-sm;
  text-transform: uppercase;

  &.is-mobile {
    margin-top: $spacer-sm;
    margin-bottom: 0;
  }
}

.panel-card-total {
  display: block;
  font-size: $font-size-h1;
  margin: 0;
  white-space: nowrap;

  &.null-data {
    height: 78px;
    line-height: 78px;
    text-align: center;
    font-size: $font-size-h1 * 1.5;
  }
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

@media screen and (min-width: $device-lg) {
  .panel-card {
    border: solid 1px transparent;

    &:hover {
      box-shadow: $shadow-lg-vr;
    }

    .handle-tab-detail {
      transition: $transition-transform;
    }

    &.active .handle-tab-detail {
      transform: rotate(90deg);
    }
  }
}

@media screen and (max-width: $device-lg) {
  .panel-card {
    padding: $spacer-base $spacer-lg;
    text-align: center;
    border-radius: initial;
    box-shadow: none !important;
    position: relative;

    &:before {
      display: block;
      width: 0;
      border-left: $border-default;
      position: absolute;
      top: $spacer-base;
      bottom: $spacer-base;
      left: 0;
    }
  }
  .panel-card-total { font-size: $font-size-h2 }
}

@media screen and (max-width: $device-sm) {
  .panel-card {
    padding: $spacer-sm $spacer-xxs;

    & + .panel-card:before {
      top: $spacer-sm;
      bottom: $spacer-sm;
    }
  }
  .panel-card-title { font-size: 12px; }
  .panel-card-total { font-size: $font-size-h3 }
}
</style>
