<template>
  <div class="va-body-container">
    <excel-importer enable-drag-drop></excel-importer>
    <br>
    Import Results
  </div>
</template>

<script>
import ExcelImporter from '@/components/ExcelImporter'

export default {
  name: 'Import',
  components: { ExcelImporter },
  data() {
    return {}
  }
}
</script>
