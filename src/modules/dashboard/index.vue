<template>
  <div class="va-body-container">
    <h1 v-if="!isMobile" class="dashboard-title">
      <va-icon icon="chart-dashboard" class="text-primary" />
      <span>{{ $t('router.dashboard') }}</span>
      <small class="text-muted">&nbsp;Coding...</small>
      <span class="float-r dashboard-filters">
        <el-select placeholder="Your Profile" value="">
          <el-option v-for="pf in profilePreset" :key="pf" :label="$t(`dashboard.filters.${pf}`)" :value="pf" disabled />
        </el-select>
        <el-select v-model="dateRange">
          <el-option v-for="range in datePreset" :key="range" :label="$t(`dashboard.filters.${range}`)" :value="range" />
        </el-select>
      </span>
    </h1>

    <!-- panel group on pc -->
    <el-row :gutter="panelGutter" class="panel-groups">
      <template v-for="(key, i) in Object.keys(data)">
        <el-col :key="key" :xs="8" :sm="6" :lg="6">
          <chart-summary
            ref="panel_chart"
            :title="$t(`dashboard.${key}`)"
            :category="category"
            :total="data[key].total"
            :data="key !== 'countries' ? data[key].data : undefined"
            :data-type="data[key].dataType"
            :suffix="data[key].suffix"
            :decimals="data[key].decimals"
            :active="i === activeIndex"
            @click.native="activeIndex = i"
          />
        </el-col>
      </template>
    </el-row>

    <chart-map ref="panelDetail" :chart-data="data.countries.data" />
  </div>
</template>

<script>
import Statistics from '@/services/statistics'
import { Loading } from 'element-ui'

import ChartSummary from './components/ChartSummary'
import ChartMap from './components/ChartMap'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ChartSummary, ChartMap },
  data() {
    return {
      dateRange: 31,
      datePreset: [31, 61, 92, 183, 365],
      profilePreset: ['pv', 'sales'],
      category: [],
      data: {
        pv: { total: 0, data: [] },
        uv: { total: 0, data: [] },
        cvr: { total: 0, data: [], dataType: 'percent', suffix: ' %', decimals: 2 },
        countries: { total: 0, data: [], top5: [] }
      },
      activeIndex: 3
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device === 'mobile'
    },
    panelGutter() {
      return this.isMobile ? 0 : 15
    }
  },
  mounted() {
    this.requestPv()
  },
  methods: {
    drawCharts() {
      this.$refs['panel_chart'].forEach(cop => {
        cop.draw()
      })
      this.$refs['panelDetail'].draw()
    },
    requestPv() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'loading...',
        background: 'rgba(255, 255, 255, .5)'
      })
      Statistics.pv().then(res => {
        this.loadingInstance.close()

        this.data.pv.total = res.totalPV
        this.data.uv.total = res.totalUV
        this.data.cvr.total = res.averageCVR
        this.data.countries.total = res.totalArea

        res.data.forEach(v => {
          this.category.push(v.date)
          this.data.pv.data.push(v.pv)
          this.data.uv.data.push(v.uv)
          this.data.cvr.data.push(+(v.cvr * 100).toFixed(2))
        })

        Object.keys(res.areas).forEach(v => {
          if (res.areas[v] > 0) this.data.countries.data.push({ name: v, value: res.areas[v] })
        })

        !this.isMobile && this.drawCharts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.dashboard-title { margin-top: 7px; }

.dashboard-filters {
  .el-input, .el-select { vertical-align: top; width: 140px; }
}

.panel-groups { margin-bottom: $spacer-base; }

@media screen and (max-width: $device-lg) {
  .panel-groups {
    background-color: $color-white;
    border-radius: $radius-base;
    box-shadow: $shadow-base;
  }

  /deep/ {
    .el-col + .el-col {
      .panel-card:before {
        content: '';
      }
    }
  }
}
</style>
