<template>
  <div class="va-body-container">
    <excel-importer enable-drag-drop :before-import="beforeImport" :on-success="onSuccess"></excel-importer>
    <br>
    <el-table style="width: 100%;" size="mini" tooltip-effect="light" empty-text="Please import an excel first"
              :data="tableData" highlight-current-row>
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item" show-overflow-tooltip/>
    </el-table>
  </div>
</template>

<script>
import ExcelImporter from '@/components/ExcelImporter'

export default {
  name: 'Import',
  components: { ExcelImporter },
  data() {
    return {
      allowSizeMax: 1, // unit: MB
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeImport(file) {
      const isLtMax = file.size / 1024 / 1024 < this.allowSizeMax

      if (!isLtMax) this.$message.warning(`Please do not import files larger than ${this.allowSizeMax}m in size.`)

      return isLtMax
    },
    onSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  },
  beforeRouteLeave(to, from, next) {
    const tableData = this.tableData
    if (tableData && tableData.length > 0) {
      const msg = 'You have an excel that has been imported. Are you sure you want to leave?'
      this.$confirm(msg, 'Are you sure?', {
        type: 'warning',
        confirmButtonText: 'Sure Leave',
        cancelButtonText: 'Cancel',
        callback: action => (action === 'confirm') && next()
      })
    } else next()
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table:before {
  content: none;
}
</style>
