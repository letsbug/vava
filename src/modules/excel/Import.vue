<template>
  <div class="va-body-container">
    <excel-importer enable-drag-drop :before-import="beforeImport" :on-success="onSuccess"></excel-importer>
    <br>
    <el-table style="width: 100%;" size="mini" tooltip-effect="light" :empty-text="$t('excelImport.emptyHint')"
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
      const allowSizeMax = this.allowSizeMax
      const isLtMax = file.size / 1024 / 1024 < allowSizeMax

      if (!isLtMax) this.$message.warning(this.$t('excelImport.errorSize', { allowSizeMax }))

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
      this.$confirm(this.$t('excelImport.exitHint'), this.$t('options.confirm.title'), {
        type: 'warning',
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
