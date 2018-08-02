<template>
  <div class="container-body no-bg dashboard">
    <el-row :gutter="15">
      <el-col :span="6"><count-panel ref="chart_total_pv" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"></count-panel></el-col>
      <el-col :span="6"><count-panel ref="chart_total_uv" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"></count-panel></el-col>
      <el-col :span="6"><count-panel ref="chart_total_ip" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"></count-panel></el-col>
      <el-col :span="6"><count-panel ref="chart_total_out" :x-axis="xAxis" :y-axis="yAxis" :datas="datas"></count-panel></el-col>
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
      xAxis: {},
      yAxis: {},
      datas: []
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
