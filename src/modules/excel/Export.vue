<template>
  <div class="va-body-container">
    <el-form inline size="medium" :model="exportOpts">
      <el-form-item label="Filename">
        <el-input :placeholder="`default ${filenameDefault}`" prefix-icon="el-icon-document" clearable
                  v-model="exportOpts.filename"></el-input>
      </el-form-item>
      <el-form-item label="File Type">
        <el-select value style="width: 100px;" v-model="exportOpts.type">
          <el-option label="xlsx" value="xlsx"></el-option>
          <el-option label="cvx" value="cvx"></el-option>
          <el-option label="txt" value="txt"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cell Auto-Width">
        <el-switch v-model="exportOpts.cellAutoWidth"></el-switch>
      </el-form-item>
      <el-form-item label="Perform Export">
        <el-button-group style="vertical-align: top;">
          <el-button type="primary" :disabled="exportOpts.exporting" @click="handleExport(list)">
            Current Page
          </el-button>
          <el-button type="primary" :disabled="exportOpts.exporting" @click="handleExportAll">
            All Pages
          </el-button>
        </el-button-group>
        <i class="el-icon-loading export-handler-loading" v-show="exportOpts.exporting"></i>
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
import Contacts from '@/services/contacts'
import { Dater } from '@/tools'

export default {
  name: 'Export',
  data() {
    return {
      filenameDefault: `xlsx-${Dater.format(new Date(), 'yyyy.MM.dd hh:mm')}`,
      exportOpts: {
        filename: '',
        tHeader: ['NAME', 'ID CARD', 'CITY', 'ZIP', 'TEL', 'MOBILE', 'FAX', 'EMAIL', 'QQ', 'COMPANY'],
        exportProps: ['name', 'card', 'city', 'postcode', 'tel', 'mobile', 'fax', 'email', 'qq', 'company'],
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
      Contacts.list(this.pages).then(res => {
        this.pages = res.pages
        this.list = res.list
      })
    },
    formatJson(props, json) {
      return json.map(v => props.map(k => v[k]))
    },
    handleExport(data) {
      this.exportOpts.exporting = true
      const _data = this.formatJson(this.exportOpts.exportProps, data)

      setTimeout(() => { // Simulated elapsed time
        import('@/vendor/ExportToExcel').then(Excel => {
          Excel.handleExport({
            header: this.exportOpts.tHeader,
            data: _data,
            filename: this.exportOpts.filename || this.filenameDefault,
            autoWidth: this.exportOpts.cellAutoWidth,
            type: this.exportOpts.type
          })
          this.exportOpts.exporting = false
        })
      }, 500)
    },
    handleExportAll() {
      this.exportOpts.exporting = true
      Contacts.all().then(res => {
        this.handleExport(res)
      })
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

  .export-handler-loading {
    margin-left: $spacer-base;
  }
}
.excel-pagination {
  text-align: right;
  margin-top: $spacer-base;
}
</style>
