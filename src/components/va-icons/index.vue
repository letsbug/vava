<template>
<svg class="va-icon" aria-hidden="true">
  <use :xlink:href="`#icon-${icon}`"></use>
</svg>
</template>

<script>
export default {
  name: 'VaIcon',
  props: {
    icon: { type: String, required: true }
  }
}
</script>

<style scoped>

</style>
