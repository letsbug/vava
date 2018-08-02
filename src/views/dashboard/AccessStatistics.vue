<template>
  <div class="container-body no-bg dashboard">
    <el-row :gutter="15">
      <el-col :span="6"><count-panel ref="chart_total_pv" :id="'pv'" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"/></el-col>
      <el-col :span="6"><count-panel ref="chart_total_uv" :id="'uv'" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"/></el-col>
      <el-col :span="6"><count-panel ref="chart_total_ip" :id="'ip'" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"/></el-col>
      <el-col :span="6"><count-panel ref="chart_total_out" :id="'out'" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"/></el-col>
    </el-row>
  </div>
</template>

<script>
import CountPanel from './commons/CountPanel'

export default {
  name: 'AccessStatistics',
  components: { CountPanel },
  data() {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      datas: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  mounted() {},
  methods: {},
  beforeDestroy() {},
}
</script>

<style scoped lang="scss">
  @import "../../styles/pages/dashboard";
</style>
