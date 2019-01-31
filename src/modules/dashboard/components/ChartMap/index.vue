<template>
  <div class="va-panel panel-detail">
    <el-row :gutter="15">
      <el-col :md="14" :lg="15" :xl="17">
        <chart-map ref="chartMap" :chart-data="chartData" />
      </el-col>
      <el-col :md="10" :lg="9" :xl="7">
        <chart-top ref="chartBar" :chart-data="chartData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartMap from './Map'
import ChartTop from './Top5'

export default {
  components: { ChartMap, ChartTop },
  props: {
    chartData: { type: Array, required: true }
  },
  methods: {
    draw() {
      this.$refs['chartMap'].draw()
      this.$refs['chartBar'].draw()
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .chart-wrapper {
  height: 400px;
}
</style>
