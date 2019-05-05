<template>
  <div class="va-body-container">
    <excel-importer :before-import="beforeImport" :on-success="onSuccess" enable-drag-drop />
    <br />
    <el-table
      :empty-text="$t('excelImport.emptyHint')" :data="tableData"
      highlight-current-row size="mini" tooltip-effect="light" style="width: 100%;"
    >
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { ExcelImporter } from '@/components'

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
