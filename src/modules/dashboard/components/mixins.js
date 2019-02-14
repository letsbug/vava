export default {
  props: {
    chartData: { type: Array, required: true }
  },
  data() {
    return {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, .86)',
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        padding: [7, 12],
        textStyle: { color: '#343a40', fontSize: 12 }
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device === 'mobile'
    },
    themeColor() {
      return this.$store.getters.theme.color
    }
  },
  mounted() {
    if (this.chartData && this.chartData.length > 0) this.draw()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.resizeHandler)

    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    draw() {
      if (!this.chartData || this.chartData.length < 1) return

      this.init()
      this.resizeHandler = () => {
        if (this.chart) this.chart.resize()
      }

      window.addEventListener('resize', this.resizeHandler)
      this.sidebar = document.querySelector('.va-side-wrapper')
      this.sidebar && this.sidebar.addEventListener('transitionend', this.resizeHandler)
    }
  }
}
