export default {
  props: {
    chartData: { type: Array, required: true }
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
      if (!this.chartData) return

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
