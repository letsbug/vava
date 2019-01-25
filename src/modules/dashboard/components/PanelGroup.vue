<template>
  <el-row :gutter="15">
    <!-- Sales -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.pv') }}</span>
          <i class="el-icon-arrow-right float-r handle-detail"></i>
        </h6>
        <i-count-to :start-val="0" :end-val="pv.total" :duration="animation.duration" class="panel-card-text" />
        <panel-chart ref="chartPV" :category="category" :data="pv.data" type="line" />
      </div>
    </el-col>

    <!-- Orders -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.uv') }}</span>
          <i class="el-icon-arrow-right float-r handle-detail"></i>
        </h6>
        <i-count-to :start-val="0" :end-val="uv.total" :duration="animation.duration" class="panel-card-text" />
        <panel-chart ref="chartUV" :category="category" :data="uv.data" type="line" />
      </div>
    </el-col>

    <!-- Page views -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.cvr') }}</span>
          <i class="el-icon-arrow-right float-r handle-detail"></i>
        </h6>
        <i-count-to :start-val="0" :end-val="cvr.average" :duration="animation.duration" class="panel-card-text" />
        <panel-chart ref="chartCVR" :category="category" :data="cvr.data" type="line" />
      </div>
    </el-col>

    <!-- Total visitors -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.countries') }}</span>
          <i class="el-icon-arrow-right float-r handle-detail"></i>
        </h6>
        <i-count-to :start-val="0" :end-val="countries" :duration="animation.duration" class="panel-card-text" />
        <div class="panel-card-additional">{{ $t('dashboard.average') + countries }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ICountTo from 'vue-count-to'
import PanelChart from './PanelChart'

export default {
  components: { PanelChart, ICountTo },
  props: {
    category: { type: Array, required: true },
    pv: { type: Object, required: true },
    uv: { type: Object, required: true },
    cvr: { type: Object, required: true },
    countries: { type: Number, required: true }
  },
  data() {
    return {
      dayCount: 31,
      animation: {
        duration: 1500
      }
    }
  },
  methods: {
    drawCharts() {
      this.$refs['chartPV'].draw()
      this.$refs['chartUV'].draw()
      this.$refs['chartCVR'].draw()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

$panel-height: 150px;

.panel-card {
  height: $panel-height;
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

.panel-card-text {
  font-size: $font-size-h1;
  margin: 0;
}

.panel-card-additional {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  left: $spacer-lg;
  bottom: $spacer-lg;
}
</style>
