/**
 * PaginationResponsive (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/8/1 22:19
 */

export default {
  mounted() {
    const isMobile = this.$store.state.application.device === 'mobile'
    this.layout = isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
  }
}
