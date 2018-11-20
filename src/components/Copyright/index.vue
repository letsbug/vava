<template>
  <div class="va-copyright"><small>© 2018 letsbug.</small></div>
</template>

<script>
export default {
  name: 'VaCopyright'
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

$copyright-height:              $foot-line-height;
$copyright-color:               $color-gray-600;

.va-copyright {
  height: $copyright-height;
  color: $copyright-color;
}
</style>
