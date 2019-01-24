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
    <panel-group :category="category" />
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import PanelGroup from './components/PanelGroup'
import Statistics from '@/services/statistics'

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
      category: []
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
        console.log(res)
        res.data.forEach(v => {
          this.category.push(v.date)
        })
        this.loadingInstance.close()
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
