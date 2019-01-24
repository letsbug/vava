<template>
  <el-row :gutter="15">
    <!-- Sales -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.sales') }}</span>
          <el-tooltip :content="$t('dashboard.tips')" effect="dark" placement="bottom">
            <va-icon icon="mark-states-question" class="mark-question" />
          </el-tooltip>
        </h6>
        <i-count-to :start-val="0" :end-val="dataSales.count" :duration="animation.duration" prefix="$ " class="panel-card-text" />
        <panel-chart :category="category" :data="dataSales.data" type="line" :title="$t('dashboard.sales')" />
        <div class="panel-card-additional">{{ $t('dashboard.average') + dataSales.average }}</div>
      </div>
    </el-col>

    <!-- Orders -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.order') }}</span>
          <el-tooltip :content="$t('dashboard.tips')" effect="dark" placement="bottom">
            <va-icon icon="mark-states-question" class="mark-question" />
          </el-tooltip>
        </h6>
        <i-count-to :start-val="0" :end-val="dataOrder.count" :duration="animation.duration" class="panel-card-text" />
        <panel-chart :category="category" :data="dataOrder.data" type="bar" :title="$t('dashboard.order')" />
        <div class="panel-card-additional">{{ $t('dashboard.average') + dataOrder.average }}</div>
      </div>
    </el-col>

    <!-- Page views -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.pv') }}</span>
          <el-tooltip :content="$t('dashboard.tips')" effect="dark" placement="bottom">
            <va-icon icon="mark-states-question" class="mark-question" />
          </el-tooltip>
        </h6>
        <i-count-to :start-val="0" :end-val="dataPV.count" :duration="animation.duration" class="panel-card-text" />
        <panel-chart :category="category" :data="dataPV.data" type="line" :title="$t('dashboard.pv')" />
        <div class="panel-card-additional">{{ $t('dashboard.average') + dataPV.average }}</div>
      </div>
    </el-col>

    <!-- Total visitors -->
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-card">
        <h6 class="panel-card-title text-secondary">
          <span>{{ $t('dashboard.uv') }}</span>
          <el-tooltip :content="$t('dashboard.tips')" effect="dark" placement="bottom">
            <va-icon icon="mark-states-question" class="mark-question" />
          </el-tooltip>
        </h6>
        <i-count-to :start-val="0" :end-val="dataUV.count" :duration="animation.duration" class="panel-card-text" />
        <panel-chart :category="category" :data="dataUV.data" type="bar" :title="$t('dashboard.uv')" />
        <div class="panel-card-additional">{{ $t('dashboard.average') + dataUV.average }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ICountTo from 'vue-count-to'
import PanelChart from './PanelChart'

export default {
  name: 'PanelGroup',
  components: { PanelChart, ICountTo },
  props: {
    category: { type: Array, required: true }
  },
  data() {
    return {
      dayCount: 31,
      animation: {
        duration: 1500
      },
      dataSales: {
        count: 0,
        average: 0,
        data: []
      },
      dataOrder: {
        count: 0,
        average: 0,
        data: []
      },
      dataPV: {
        count: 0,
        average: 0,
        data: []
      },
      dataUV: {
        count: 0,
        average: 0,
        data: []
      }
    }
  },
  computed: {
    themeColor() {
      return this.$store.getters.theme.color
    }
  },
  created() {
    this.generateData('dataSales')
    this.generateData('dataOrder')
    this.generateData('dataPV')
    this.generateData('dataUV')
  },
  methods: {
    generateData(type) {
      const data = [Math.round(Math.random() * 2048)]
      let count = 0

      for (let i = 0; i < this.dayCount; i++) {
        const _data = Math.abs(Math.round((Math.random() - 0.5) * 800 + data[i]))
        count += _data
        data.push(_data)
      }
      this[type].count = count
      this[type].average = Math.round(count / this.dayCount)
      this[type].data = data
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.panel-card {
  padding: $spacer-lg;
  background-color: $color-white;
  border-radius: $radius-base;
  box-shadow: $shadow-sm-vr;
  margin-bottom: $spacer-base;
}

.panel-card-title {
  margin-top: 0;
  margin-bottom: $spacer-sm;

  .mark-question {
    width: $font-size-h3;
    height: $font-size-h3;
    float: right;
    margin-top: -3px;
    cursor: pointer;
  }
}

.panel-card-text {
  font-size: $font-size-h1;
  margin: 0;
}

.panel-card-additional {
  margin-top: $spacer-base;
  margin-bottom: -($spacer-lg - $spacer-base);
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>
