<template>
  <svg class="va-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true }
  }
}
</script>

<style scoped>
  .va-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
