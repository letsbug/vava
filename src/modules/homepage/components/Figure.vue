<template>
  <svg class="homepage-figure" aria-hidden="true">
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
  .homepage-figure {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
    overflow: hidden;
  }
</style>
