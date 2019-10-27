<template>
  <div class="va-copyright">
    <small>© {{ new Date().getFullYear() }} letsbug.</small>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'VaCopyright' })
export default class extends Vue {}
</script>
