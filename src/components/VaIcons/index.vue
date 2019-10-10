<template>
  <svg class="va-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'VaIcon' })
export default class extends Vue {
  @Prop({ required: true })
  private icon!: string;
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
