<template>
  <div class="va-body-container">
    <h1 v-if="!isMobile" class="dashboard-title">
      <va-icon icon="chart-dashboard" class="text-primary" />
      <span>{{ $t('router.dashboard') }}</span>
      <span class="float-r dashboard-filters">
        <el-select placeholder="Your Profile" value="">
          <el-option
            v-for="pf in profilePreset"
            :key="pf"
            :label="$t(`dashboard.filters.${pf}`)"
            :value="pf"
            disabled
          />
        </el-select>
        <el-select v-model="dateRange">
          <el-option
            v-for="range in datePreset"
            :key="range"
            :label="$t(`dashboard.filters.${range}`)"
            :value="range"
          />
        </el-select>
      </span>
    </h1>

    <!-- panel groups -->
    <el-row :gutter="panelGutter" class="panel-groups">
      <template v-for="(key, i) in Object.keys(data)">
        <el-col :key="i" :xs="6" :sm="6" :lg="6">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ChartTabs, ChartDetails, ChartAges, TrafficAnalysis } from './components';
import { Loading } from 'element-ui';
import { IStoreSystem, DeviceType } from '@/store/modules/system';
import { getPaveViews } from '@/apis/statistics';
import EChartsMixins from './components/mixins';
import { ElLoadingComponent } from 'element-ui/types/loading';
import { ITypeStatistics, ITypeStatisticsArea, ITypeStatisticsBasic } from '@/apis/types';

@Component({ name: 'Dashboard', components: { ChartTabs, ChartDetails, ChartAges, TrafficAnalysis } })
export default class extends Vue {
  // metaInfo: { title: 'Dashboard' },
  private loadingInstance: ElLoadingComponent = Loading.service({
    lock: true,
    text: 'loading...',
    background: 'rgba(255, 255, 255, .5)'
  });

  private dateRange = 31;
  private datePreset = [31, 61, 92, 183, 365];
  private profilePreset = ['pv', 'sales'];
  private category: number[] = [];
  private data: { [key: string]: any } = {
    pv: { total: 0, data: [] },
    uv: { total: 0, data: [] },
    cvr: {
      total: 0,
      data: [],
      dataType: 'percent',
      suffix: ' %',
      decimals: 2
    },
    countries: { total: 0, data: [] }
  };
  private activeIndex: number = 0;
  private detailData = [];
  private attach = {
    ages: [],
    sources: [],
    interviews: []
  };

  private get isMobile() {
    return IStoreSystem.device === DeviceType.Mobile;
  }
  private get panelGutter() {
    return this.isMobile ? 0 : 15;
  }

  mounted() {
    this.requestPageViews();
  }

  updated() {
    this.checkDetails();
    (this.$refs['chartAges'] as EChartsMixins).draw();
  }

  private checkDetails() {
    this.detailData = this.data[Object.keys(this.data)[this.activeIndex]].data;
    (this.$refs['chartDetails'] as EChartsMixins).draw();
  }

  private requestPageViews() {
    getPaveViews().then((res: any) => {
      if (!res.success) return;

      const { basic, areas } = res.data as ITypeStatistics;
      // this.data.countries.total = res.areas.length;

      basic.forEach(v => {
        this.category.push(v.date);

        this.data.pv.data.push(v.pv);
        this.data.pv.total += v.pv;

        this.data.uv.data.push(v.uv);
        this.data.uv.total += v.uv;

        this.data.cvr.data.push((v.cvr * 100).toFixed(2));
        this.data.cvr.total += v.cvr;
      });

      this.data.cvr.total = this.data.cvr.total / basic.length;

      this.data.countries.data = areas;
      this.data.countries.total = areas.length;
      // this.attach.ages = res.ages;
      // this.attach.sources = res.traffics.source;
      // this.attach.interviews = res.traffics.interview;

      if (!this.isMobile) {
        (this.$refs['panel_chart'] as EChartsMixins[]).forEach(cop => {
          cop.draw();
        });
      }

      this.loadingInstance.close();
    });
  }

  requestAgesCounts() {}
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.dashboard-title {
  margin-top: 7px;
}

.dashboard-filters {
  .el-input,
  .el-select {
    vertical-align: top;
    width: 140px;
  }
}

.panel-groups {
  margin-bottom: $spacer-base;
  overflow: hidden;
}

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
