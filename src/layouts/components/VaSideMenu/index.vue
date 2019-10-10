<template>
  <div class="va-side-wrapper">
    <brand class="va-side-brand" has-title has-link />
    <va-side-menu />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Brand } from '@/components';
import VaSideMenu from './VaSideMenu.vue';

@Component({ name: 'VaSideBar', components: { Brand, VaSideMenu } })
export default class extends Vue {}
</script>
