<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <div class="panel-card">
        <h6 class="panel-card-title">
          <span>访问量</span>
          <va-icon icon="mark-states-question" class="mark-question" />
        </h6>
        <h1 class="panel-card-text">12580.00</h1>
        <panel-chart :category="category" :data="data" type="line" title="访问量" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-card">
        <h6 class="panel-card-title">
          <span>访问量</span>
          <va-icon icon="mark-states-question" class="mark-question" />
        </h6>
        <h1 class="panel-card-text">12580.00</h1>
        <panel-chart :category="category" :data="data" type="line" title="访问量" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-card">
        <h6 class="panel-card-title">
          <span>访问量</span>
          <va-icon icon="mark-states-question" class="mark-question" />
        </h6>
        <h1 class="panel-card-text">12580.00</h1>
        <panel-chart :category="category" :data="data" type="line" title="访问量" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-card">
        <h6 class="panel-card-title">
          <span>访问量</span>
          <va-icon icon="mark-states-question" class="mark-question" />
        </h6>
        <h1 class="panel-card-text">12580.00</h1>
        <panel-chart :category="category" :data="data" type="line" title="访问量" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PanelChart from './PanelChart'

export default {
  name: 'PanelGroup',
  components: { PanelChart },
  data() {
    return {
      category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  computed: {
    themeColor() {
      return this.$store.getters.theme.color
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.panel-card {
  padding: $spacer-base;
  background-color: $color-white;
  border-radius: $radius-base;
  box-shadow: $shadow-base-vr;
}

.panel-card-title {
  margin-top: 0;
  margin-bottom: $spacer-base;

  .mark-question {
    width: $font-size-h3;
    height: $font-size-h3;
    float: right;
    margin-top: -3px;
  }
}

.panel-card-text {
  margin: 0;
}
</style>
