<template>
  <div class="va-body-container">
    <h3 class="va-body-title">
      Reports
    </h3>
    <p>Test route cache in desktop, input something, and jump to others route and back.</p>
    <el-input v-model="input" type="text" title="route cache test" />
  </div>
</template>

<script>
export default {
  name: 'Report',
  metaInfo: {
    title: 'Reports'
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>
