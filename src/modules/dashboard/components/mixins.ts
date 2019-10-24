import { Component, Prop, Vue } from 'vue-property-decorator';
import { ECharts } from 'echarts';
import { IStoreSystem, DeviceType } from '@/store/modules/system';

@Component({ name: 'EChartsMixins' })
export default class extends Vue {
  @Prop({ required: true }) protected chartData!: Array<any>;

  protected tooltip = {
    backgroundColor: 'rgba(255, 255, 255, .86)',
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
    padding: [7, 12],
    textStyle: { color: '#343a40', fontSize: 12 }
  };
  private sidebar!: HTMLDivElement | null;
  protected chart!: ECharts | null;

  get isMobile() {
    return IStoreSystem.device === DeviceType.Mobile;
  }

  get themeColor() {
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

  resizeHandler = () => {
    if (this.chart) this.chart.resize();
  };

  protected init() {}

  draw() {
    if (!this.chartData || this.chartData.length < 1) return;

    this.init();
    window.addEventListener('resize', this.resizeHandler);
    const sidebar = document.querySelector('.va-side-wrapper');
    sidebar && sidebar.addEventListener('transitionend', this.resizeHandler);
  }
}
