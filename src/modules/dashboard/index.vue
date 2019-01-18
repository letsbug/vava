<template>
  <div class="va-body-container">
    <h1 class="dashboard-title">
      <va-icon icon="chart-dashboard" class="text-primary" />
      <span>{{ $t('router.dashboard') }}</span>
      <small class="text-muted">&nbsp;Coding...</small>
      <span class="float-r dashboard-filters">
        <el-select v-model="profile" style="width: 140px;">
          <el-option v-for="pf in profilePreset" :key="pf" :label="$t(`dashboard.filters.${pf}`)" :value="pf" />
        </el-select>
        <el-select v-model="dateRange" style="width: 140px;">
          <el-option v-for="range in datePreset" :key="range" :label="$t(`dashboard.filters.${range}`)" :value="range" />
        </el-select>
      </span>
    </h1>
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

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
      profile: 'pv',
      profilePreset: ['pv', 'sales']
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
  }
}
</style>
