<template>
  <div class="va-body-container">
    <h1 v-if="!isMobile" class="dashboard-title">
      <va-icon icon="chart-dashboard" class="text-primary" />
      <span>{{ $t('router.dashboard') }}</span>
      <span class="float-r dashboard-filters">
        <el-select placeholder="Your Profile" value="">
          <el-option v-for="pf in profilePreset" :key="pf" :label="$t(`dashboard.filters.${pf}`)" :value="pf" disabled />
        </el-select>
        <el-select v-model="dateRange">
          <el-option v-for="range in datePreset" :key="range" :label="$t(`dashboard.filters.${range}`)" :value="range" />
        </el-select>
      </span>
    </h1>

    <!-- panel groups -->
    <el-row :gutter="panelGutter" class="panel-groups">
      <template v-for="(key, i) in Object.keys(data)">
        <el-col :key="key" :xs="6" :sm="6" :lg="6">
          <chart-tabs
            ref="panel_chart"
            :title="$t(`dashboard.${key}`)"
            :category="category"
            :total="data[key].total"
            :chart-data="key !== 'countries' ? data[key].data : undefined"
            :data-type="data[key].dataType"
            :suffix="data[key].suffix"
            :decimals="data[key].decimals"
            :active="i === activeIndex"
            @click.native="activeIndex = i"
          />
        </el-col>
      </template>
    </el-row>

    <!-- details -->
    <chart-details
      ref="chartDetails"
      :chart-data="detailData"
      :category="category"
      :is-percent="activeIndex === 2"
      :is-chart-map="activeIndex === 3"
    />

    <el-row :gutter="15" style="margin-top: 15px;">
      <el-col :md="24" :lg="16" style="margin-bottom: 15px;">
        <chart-ages ref="chartAges" :chart-data="attach.ages" />
      </el-col>
      <el-col :md="24" :lg="8" style="margin-bottom: 15px;">
        <traffic-analysis :total-pv="data.pv.total" :sources="attach.sources" :interviews="attach.interviews" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ChartTabs, ChartDetails, ChartAges, TrafficAnalysis } from './components'
import { Loading } from 'element-ui'

import Statistics from '@/apis/statistics'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ChartTabs, ChartDetails, ChartAges, TrafficAnalysis },
  data() {
    return {
      dateRange: 31,
      datePreset: [31, 61, 92, 183, 365],
      profilePreset: ['pv', 'sales'],
      category: [],
      data: {
        pv: { total: 0, data: [] },
        uv: { total: 0, data: [] },
        cvr: { total: 0, data: [], dataType: 'percent', suffix: ' %', decimals: 2 },
        countries: { total: 0, data: [] }
      },
      activeIndex: 0,
      detailData: [],
      attach: {
        ages: [],
        sources: [],
        interviews: []
      }
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
  updated() {
    this.checkDetails()
    this.$refs['chartAges'].draw()
  },
  methods: {
    checkDetails() {
      this.detailData = this.data[Object.keys(this.data)[this.activeIndex]].data
      this.$refs['chartDetails'].draw()
    },
    requestPv() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'loading...',
        background: 'rgba(255, 255, 255, .5)'
      })
      Statistics.pv().then(res => {
        this.loadingInstance.close()

        if (!res.success) return

        this.data.pv.total = res.totalPV
        this.data.uv.total = res.totalUV
        this.data.cvr.total = res.averageCVR
        this.data.countries.total = res.areas.length

        res.data.forEach(v => {
          this.category.push(v.date)
          this.data.pv.data.push(v.pv)
          this.data.uv.data.push(v.uv)
          this.data.cvr.data.push((v.cvr * 100).toFixed(2))
        })

        this.data.countries.data = res.areas
        this.attach.ages = res.ages
        this.attach.sources = res.traffics.source
        this.attach.interviews = res.traffics.interview

        if (!this.isMobile) {
          this.$refs['panel_chart'].forEach(cop => {
            cop.draw()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.dashboard-title { margin-top: 7px; }

.dashboard-filters {
  .el-input, .el-select { vertical-align: top; width: 140px; }
}

.panel-groups { margin-bottom: $spacer-base; overflow: hidden; }

/deep/ {
  .va-panels {
    background-color: $color-white;
    box-shadow: $shadow-base;
  }

  .chart-detail-wrapper {
    height: 400px;
  }
}

@media screen and (max-width: $device-lg) {
  .panel-groups {
    background-color: $color-white;
    border-radius: $radius-base;
    box-shadow: $shadow-base;
  }

  /deep/ {
    .el-col + .el-col {
      .panel-card:before {
        content: '';
      }
    }

    .chart-detail-wrapper {
      height: 60vw;

      &.x2 {
        height: 120vw;
      }
    }
  }
}
</style>
