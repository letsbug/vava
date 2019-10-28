import { Component, Prop, Vue } from 'vue-property-decorator';
import { ECharts, EChartOption } from 'echarts';
import { IStoreSystem, DeviceType } from '@/store/modules/system';
import { parseDate } from '@/utils/datetime';

@Component({ name: 'EChartsMixins' })
export default class extends Vue {
  @Prop({ required: true }) protected chartData!: Array<any>;

  private sidebar!: HTMLDivElement | null;

  protected tooltip = {
    backgroundColor: 'rgba(255, 255, 255, .86)',
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
    padding: [7, 12],
    textStyle: { color: '#343a40', fontSize: 12 }
  };
  protected xAxis: EChartOption.XAxis = {
    type: 'category',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#6a6d71',
      formatter: (params: any) => {
        return parseDate(params, 'yyyy/MM/dd');
      }
    }
  };

  protected chart!: ECharts | null;

  protected get isMobile() {
    return IStoreSystem.device === DeviceType.Mobile;
  }

  protected get themeColor() {
    return IStoreSystem.theme.color;
  }

  mounted() {
    if (this.chartData && this.chartData.length > 0) this.draw();
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.resizeHandler);

    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  private resizeHandler = () => {
    if (this.chart) this.chart.resize();
  };

  protected init() {}

  public draw() {
    if (!this.chartData || this.chartData.length < 1) return;

    this.init();
    window.addEventListener('resize', this.resizeHandler);
    const sidebar = document.querySelector('.va-side-wrapper');
    sidebar && sidebar.addEventListener('transitionend', this.resizeHandler);
  }
}
