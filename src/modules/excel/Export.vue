<template>
  <div class="va-body-container">
    <el-form :model="exportOpts" inline size="medium">
      <el-form-item :label="$t('excelExport.filename')">
        <el-input
          v-model="exportOpts.filename"
          :placeholder="filenameDefault"
          prefix-icon="el-icon-document"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('excelExport.fileType')">
        <el-select v-model="exportOpts.type" value style="width: 100px;">
          <el-option label="xlsx" value="xlsx" />
          <el-option label="cvx" value="cvx" />
          <el-option label="txt" value="txt" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('excelExport.autoWidth')">
        <el-switch v-model="exportOpts.cellAutoWidth" />
      </el-form-item>
      <el-form-item :label="$t('excelExport.execute')">
        <el-button-group style="vertical-align: top;">
          <el-button :disabled="exportOpts.exporting" type="primary" @click="handleExport(list)">
            {{ $t('excelExport.currentPage') }}
          </el-button>
          <el-button :disabled="exportOpts.exporting" type="primary" @click="handleExportAll">
            {{ $t('excelExport.allPages') }}
          </el-button>
        </el-button-group>
        <i v-show="exportOpts.exporting" class="el-icon-loading export-handler-loading"></i>
      </el-form-item>
    </el-form>

    <!-- table list -->
    <el-table v-loading="loading" :data="list" tooltip-effect="light">
      <el-table-column prop="name" label="name" width="120" show-overflow-tooltip />
      <el-table-column prop="card" label="ID Card" show-overflow-tooltip />
      <el-table-column prop="city" label="city" width="70" show-overflow-tooltip />
      <el-table-column prop="postcode" label="zip" width="70" />
      <el-table-column prop="tel" label="tel" width="110" />
      <el-table-column prop="mobile" label="mobile" width="105" />
      <el-table-column prop="fax" label="fax" width="110" />
      <el-table-column prop="email" label="email" show-overflow-tooltip />
      <el-table-column prop="qq" label="QQ" width="110" />
      <el-table-column prop="company" label="company" show-overflow-tooltip />
    </el-table>

    <el-pagination
      v-if="list && list.length > 0"
      :page-sizes="[10, 30, 50]"
      :current-page="pages.page"
      :page-size="pages.size"
      :total="pages.total"
      layout="total, sizes, prev, pager, next, jumper"
      class="excel-pagination"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { apiContactAll, apiContactList } from '@/apis/contacts';
import { parseDate, parseTimeGap } from '@/utils/datetime';
import { exportJson2Excel } from '@/vendor/export-excel';

@Component({ name: 'Export' })
export default class extends Vue {
  filenameDefault = `xlsx-${parseDate(new Date(), 'yyyy.MM.dd hh:mm')}`;
  exportOpts = {
    filename: '',
    tHeader: ['NAME', 'ID CARD', 'CITY', 'ZIP', 'TEL', 'MOBILE', 'FAX', 'EMAIL', 'QQ', 'COMPANY'],
    exportProps: ['name', 'card', 'city', 'postcode', 'tel', 'mobile', 'fax', 'email', 'qq', 'company'],
    cellAutoWidth: false,
    type: 'xlsx',
    exporting: false
  };
  list = null;
  loading = false;
  pages = { page: 1, size: 10, total: 0 };

  created() {
    this.getContacts();
  }

  handlePageChange(val: any) {
    this.pages.page = val;
    this.getContacts();
  }

  handleSizeChange(val: number) {
    this.pages.size = val;
    this.getContacts();
  }

  getContacts() {
    this.loading = true;
    apiContactList(this.pages).then((res: any) => {
      this.loading = false;
      this.pages = res.pages;
      this.list = res.data;
    });
  }

  formatJson(props: string[], json: any[]) {
    return json.map((v: { [key: string]: any }) => props.map((k: string) => v[k]));
  }

  handleExport(data: any) {
    this.exportOpts.exporting = true;
    const tHeader = this.exportOpts.tHeader;
    const filename = this.exportOpts.filename || this.filenameDefault;
    const autoWidth = this.exportOpts.cellAutoWidth;
    const bookType = this.exportOpts.type;
    data = this.formatJson(this.exportOpts.exportProps, data);

    exportJson2Excel(tHeader, data, filename, undefined, undefined, autoWidth, bookType);
    this.exportOpts.exporting = false;
  }

  handleExportAll() {
    this.exportOpts.exporting = true;
    apiContactAll().then(res => {
      this.handleExport(res);
    });
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

/deep/.el-form--inline .el-form-item {
  margin-right: 0;

  & + .el-form-item {
    margin-left: $spacer-xxl;
  }

  .el-switch {
    vertical-align: text-top;
  }

  .export-handler-loading {
    margin-left: $spacer-base;
  }
}
</style>
