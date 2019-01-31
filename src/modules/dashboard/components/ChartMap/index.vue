<template>
  <div class="va-panel panel-detail">
    <el-row :gutter="15">
      <el-col :span="16">
        <chart-map ref="chartMap" :chart-data="chartData" />
      </el-col>
      <el-col :span="8">
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
