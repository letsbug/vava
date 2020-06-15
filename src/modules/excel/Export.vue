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
      <el-form-item class="float-r">
        <el-button
          :disabled="exportOpts.exporting"
          :loading="exportOpts.exporting"
          type="primary"
          @click="handleExport(list)"
        >
          {{ $t('excelExport.execute') }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- table list -->
    <el-table v-loading="loading" :data="list" tooltip-effect="light">
      <el-table-column prop="nickname" label="name" width="120" show-overflow-tooltip />
      <el-table-column prop="city" label="city" width="120" show-overflow-tooltip />
      <el-table-column prop="postcode" label="zip" width="100" />
      <el-table-column prop="phone" label="tel" width="100" show-overflow-tooltip />
      <el-table-column prop="sex" label="sex" width="110">
        <template slot-scope="scope">{{ ['female', 'male'][scope.row.sex] }}</template>
      </el-table-column>
      <el-table-column prop="qq" label="QQ" width="110" />
      <el-table-column prop="email" label="email" show-overflow-tooltip />
      <el-table-column prop="intro" label="intro" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { apiUserMocks } from '@/apis/account';
import { parseDate, parseTimeGap } from '@/utils/datetime';
import { exportJson2Excel } from '@/vendor/export-excel';

@Component({ name: 'Export' })
export default class extends Vue {
  private filenameDefault = `xlsx-${parseDate(new Date(), 'yyyy.MM.dd hh:mm')}`;
  private exportOpts = {
    filename: '',
    tHeader: ['NAME', 'CITY', 'ZIP', 'TEL', 'SEX', 'QQ', 'EMAIL', 'INTRO'],
    exportProps: ['nickname', 'city', 'postcode', 'phone', 'sex', 'qq', 'email', 'intro'],
    cellAutoWidth: false,
    type: 'xlsx',
    exporting: false,
  };
  private list = null;
  private loading = false;

  created() {
    this.getContacts();
  }

  private getContacts() {
    this.loading = true;
    apiUserMocks().then((res: any) => {
      this.loading = false;
      this.list = res.data;
    });
  }

  private formatJson(props: string[], json: any[]) {
    return json.map((v: { [key: string]: any }) => props.map((k: string) => v[k]));
  }

  private handleExport(data: any) {
    this.exportOpts.exporting = true;
    const tHeader = this.exportOpts.tHeader;
    const filename = this.exportOpts.filename || this.filenameDefault;
    const autoWidth = this.exportOpts.cellAutoWidth;
    const bookType = this.exportOpts.type;
    data = this.formatJson(this.exportOpts.exportProps, data);

    exportJson2Excel(tHeader, data, filename, undefined, undefined, autoWidth, bookType);
    this.exportOpts.exporting = false;
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
