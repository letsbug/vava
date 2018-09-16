<template>
<svg class="va-icon" aria-hidden="true" @click.prevent="clicked">
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
  },
  methods: {
    clicked() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
