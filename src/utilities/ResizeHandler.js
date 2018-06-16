/**
 * ResizeHandler.
 * @author: gzb
 * @date: 2018-06-17 02:38
 */

import store from '@/store'

const { body } = document
const WIDTH = 992

export default {
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width < WIDTH
    },
    resizeHandler() {
      const isMobile = this.isMobile()
      store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')
    }
  }
}
