<template>
  <div class="va-body-container">
    <el-form inline size="medium" :model="exportOpts">
      <el-form-item label="Filename">
        <el-input :placeholder="`default ${filenameDefault}`" prefix-icon="el-icon-document" clearable
                  v-model="exportOpts.filename"></el-input>
      </el-form-item>
      <el-form-item label="Cell Auto-Width">
        <el-switch v-model="exportOpts.cellAutoWidth"></el-switch>
      </el-form-item>
      <el-form-item label="File Type">
        <el-select value style="width: 100px;" v-model="exportOpts.type">
          <el-option label="xlsx" value="xlsx"></el-option>
          <el-option label="cvx" value="cvx"></el-option>
          <el-option label="txt" value="txt"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="exportOpts.exporting" @click="handleExport">Export Excel</el-button>
      </el-form-item>
    </el-form>

    <!-- table list -->
    <el-table :data="list" tooltip-effect="light" :height="48*11 + 'px'"
              :empty-text="tableEmptyHint">
      <el-table-column prop="name" label="name" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="card" label="ID Card" show-overflow-tooltip></el-table-column>
      <el-table-column prop="city" label="city" width="70" show-overflow-tooltip></el-table-column>
      <el-table-column prop="postcode" label="zip" width="70"></el-table-column>
      <el-table-column prop="tel" label="tel" width="110"></el-table-column>
      <el-table-column prop="mobile" label="mobile" width="105"></el-table-column>
      <el-table-column prop="fax" label="fax" width="110"></el-table-column>
      <el-table-column prop="email" label="email" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qq" label="QQ" width="110"></el-table-column>
      <el-table-column prop="company" label="company" show-overflow-tooltip></el-table-column>
    </el-table>

    <el-pagination
      class="excel-pagination"
      v-if="list && list.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 30, 50]"
      :current-page="pages.page"
      :page-size="pages.size"
      :total="pages.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
import { contacts } from '@/services/contacts'
import { Dater, Excel } from '@/tools'

export default {
  name: 'Export',
  data() {
    return {
      filenameDefault: `xlsx-${Dater.format(new Date(), 'yyyy.MM.dd hh:mm')}`,
      exportOpts: {
        filename: '',
        cellAutoWidth: false,
        type: 'xlsx',
        exporting: false
      },
      list: null,
      pages: { page: 1, size: 10, total: 0 }
    }
  },
  computed: {
    tableEmptyHint() {
      const list = this.list
      return !list ? 'Loading...' : list.length < 1 ? 'Sorry! This category have nothing data.' : ''
    }
  },
  methods: {
    handlePageChange(val) {
      this.pages.page = val
      this.getContacts()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getContacts()
    },
    getContacts() {
      contacts(this.pages).then(res => {
        this.pages = res.pages
        this.list = res.list
      })
    },
    formatJson(props, json) {
      return json.map(v => props.map(k => v[k]))
    },
    handleExport() {
      this.exportOpts.exporting = true
      const tHeader = ['NAME', 'ID CARD', 'CITY', 'POSTCODE', 'TEL', 'MOBILE', 'FAX', 'EMAIL', 'QQ', 'COMPANY']
      const exportProps = ['name', 'card', 'city', 'postcode', 'tel', 'mobile', 'fax', 'email', 'qq', 'company']
      const data = this.formatJson(exportProps, this.list)
      Excel.exportExlByJson({
        header: tHeader,
        data: data,
        filename: this.exportOpts.filename || this.filenameDefault
      }).then(() => { this.exportOpts.exporting = false })
    }
  },
  created() {
    this.getContacts()
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

/deep/.el-form--inline .el-form-item {
  margin-right: 0;

  & + .el-form-item {
    margin-left: $spacer-xxl;
  }

  .el-switch {
    vertical-align: text-top
  }
}
.excel-pagination {
  text-align: right;
  margin-top: $spacer-base;
}
</style>
