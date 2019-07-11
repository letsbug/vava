import Service from '@/apis/articles'

export default {
  data() {
    return {
      pages: { page: 1, size: 10, total: 0 },
      list: [],
      loading: false
    }
  },
  filters: {
    articleStatus(status) {
      const statusMap = {
        draft: 'info',
        committed: 'warning',
        failing: 'danger',
        auditing: 'primary',
        audited: 'success',
        deleted: 'info'
      }
      return statusMap[status]
    }
  },
  methods: {
    getList() {
      this.loading = true
      Service.list(this.pages).then(res => {
        if (!res.success) return

        this.list = res.data.map(v => {
          this.$set(v, 'editing', false)
          this.$set(v, 'submitting', false)
          this.$set(v, 'originalTitle', v.title)
          return v
        })
        this.pages = res.pages
        this.loading = false
      })
    },
    handlePageChange(val) {
      this.pages.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
