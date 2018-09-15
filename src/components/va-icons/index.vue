<template>
<svg class="va-icon" aria-hidden="true">
  <use :xlink:href="iconName"></use>
</svg>
</template>

<script>
export default {
  name: 'VaIcon',
  props: {
    icon: { type: String, default: '' }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style scoped>

</style>
