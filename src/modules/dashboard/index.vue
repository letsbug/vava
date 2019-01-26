<template>
  <div class="va-body-container">
    <h1 class="dashboard-title">
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
    <el-row :gutter="panelGutter">
      <el-col :xs="12" :sm="6" :lg="6">
        <chart-summary
          ref="panelPV"
          :title="$t('dashboard.pv')"
          :category="category"
          :data="pv.data"
          :total="pv.total"
        />
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <chart-summary
          ref="panelUV"
          :title="$t('dashboard.uv')"
          :category="category"
          :data="uv.data"
          :total="uv.total"
        />
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <chart-summary
          ref="panelCVR"
          :title="$t('dashboard.cvr')"
          data-type="percent"
          :category="category"
          :data="cvr.data"
          :total="cvr.total"
          suffix="%"
          :decimals="2"
        />
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <chart-summary
          ref="panelCountry"
          :title="$t('dashboard.countries')"
          :category="category"
          :total="countries"
        />
      </el-col>
    </el-row>

    <!-- panel group on mobile -->
  </div>
</template>

<script>
import Statistics from '@/services/statistics'
import { Loading } from 'element-ui'

import ChartSummary from './components/ChartSummary'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ChartSummary },
  data() {
    return {
      dateRange: 31,
      datePreset: [31, 61, 92, 183, 365],
      profilePreset: ['pv', 'sales'],
      category: [],
      pv: { total: 0, data: [] },
      uv: { total: 0, data: [] },
      cvr: { total: 0, data: [] },
      countries: 0
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
      this.$refs['panelPV'].draw()
      this.$refs['panelUV'].draw()
      this.$refs['panelCVR'].draw()
    },
    requestPv() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'loading...',
        background: 'rgba(255, 255, 255, .5)'
      })
      Statistics.pv().then(res => {
        this.loadingInstance.close()

        this.pv.total = res.totalPV
        this.uv.total = res.totalUV
        this.cvr.total = res.averageCVR
        this.countries = res.totalArea

        res.data.forEach(v => {
          this.category.push(v.date)
          this.pv.data.push(v.pv)
          this.uv.data.push(v.uv)
          this.cvr.data.push(+(v.cvr * 100).toFixed(2))
        })

        !this.isMobile && this.drawCharts()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.dashboard-title {
  margin-top: 7px;
}

.dashboard-filters {
  .el-input, .el-select {
    vertical-align: top;
    width: 140px;
  }
}
</style>
