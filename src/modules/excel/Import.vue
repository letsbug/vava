<template>
  <div class="va-body-container">
    <excel-importer enable-drag-drop :before-import="beforeImport" :on-success="onSuccess"></excel-importer>
    <br>
    <el-table style="width: 100%;" size="mini" tooltip-effect="light" empty-text="Please import an excel first"
              :data="tableData" highlight-current-row>
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
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
  computed: {
  },
  methods: {
    beforeImport(file) {
      if (file.size / 1024 / 1024 < this.allowSizeMax) {
        return true
      }

      this.$message({
        message: `Please do not upload files larger than ${this.allowSizeMax}m in size.`,
        type: 'warning'
      })
      return false
    },
    onSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table:before {
  content: none;
}
</style>
