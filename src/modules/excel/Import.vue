<template>
  <div class="va-body-container">
    <excel-importer :before-import="beforeImport" :on-success="onSuccess" enable-drag-drop />
    <br />
    <el-table
      :empty-text="$t('excelImport.emptyHint')"
      :data="tableData"
      highlight-current-row
      size="mini"
      tooltip-effect="light"
      style="width: 100%;"
    >
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { ExcelImporter } from '@/components';

@Component({ name: 'Import', components: { ExcelImporter } })
export default class extends Vue {
  allowSizeMax = 1; // unit: MB
  tableData: any[] = [];
  tableHeader: any[] = [];

  beforeRouteLeave(to: RouteConfig, _: RouteConfig, next: Function) {
    const tableData = this.tableData;
    if (tableData && tableData.length > 0) {
      this.$confirm(this.$t('excelImport.exitHint') as string, this.$t('options.confirm.title') as string, {
        type: 'warning',
        callback: (action: string) => action === 'confirm' && next()
      });
    } else next();
  }

  beforeImport(file: File) {
    const allowSizeMax = this.allowSizeMax;
    const isLtMax = file.size / 1024 / 1024 < allowSizeMax;

    if (!isLtMax) this.$message.warning(this.$t('excelImport.errorSize', { allowSizeMax }) as string);

    return isLtMax;
  }

  onSuccess(data: { results: any[]; header: any[] }) {
    const { results, header } = data;
    this.tableData = results;
    this.tableHeader = header;
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table:before {
  content: none;
}
</style>
