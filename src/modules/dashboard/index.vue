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
    <panel-group
      ref="panelGroup"
      :category="category"
      :pv="pv"
      :uv="uv"
      :cvr="cvr"
      :countries="countries"
    />
  </div>
</template>

<script>
import Statistics from '@/services/statistics'
import { Loading } from 'element-ui'

import PanelGroup from './components/PanelGroup'
// import PanelOverview from './components/PanelOverview'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { PanelGroup },
  data() {
    return {
      dateRange: 31,
      datePreset: [31, 61, 92, 183, 365],
      profilePreset: ['pv', 'sales'],
      category: [],
      pv: { total: 0, data: [] },
      uv: { total: 0, data: [] },
      cvr: { average: 0, data: [] },
      countries: 0
    }
  },
  mounted() {
    this.requestPv()
  },
  methods: {
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
        this.cvr.average = res.averageCVR
        this.countries = res.totalArea

        res.data.forEach(v => {
          this.category.push(v.date)
          this.pv.data.push(v.pv)
          this.uv.data.push(v.uv)
          this.cvr.data.push(v.cvr)
        })

        this.$refs['panelGroup'].drawCharts()
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
