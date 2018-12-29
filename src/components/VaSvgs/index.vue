<template>
  <svg class="va-svg-image" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true }
  }
}
</script>

<style scoped>
  .va-svg-image {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    fill: currentColor;
    overflow: hidden;
  }
</style>
