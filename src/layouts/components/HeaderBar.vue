<template>
  <div class="container-header">
    <div class="header-nav nav-left">
      <a class="nav-item"><svg class="icon-svg" aria-hidden="true"><use xlink:href="#if-handle-close"></use></svg></a>
      <a class="nav-item open-in-browser"><svg class="icon-svg" aria-hidden="true"><use
        xlink:href="#if-handle-browse"></use></svg></a>
      <a class="nav-item" @click.prevent="handleRefresh"><svg class="icon-svg handle-refresh" aria-hidden="true"><use
        xlink:href="#if-handle-refresh-half"></use></svg></a>
    </div>
    Header Bar
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    handleRefresh(e) {
      let el = e.target
      if (el.tagName !== 'svg') el = (el.tagName === 'A') ? el.childNodes[0] : el.parentNode
      if (el.classList[2] === 'doing') return

      el.classList.add('doing')
      setTimeout(() => { el.classList.remove('doing') }, 6000)
      // location.reload()
    }
  }
}
</script>
