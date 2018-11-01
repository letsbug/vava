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
        <el-button type="primary">Export Excel</el-button>
      </el-form-item>
    </el-form>

    <!-- table list -->
    <el-table :data="list" tooltip-effect="light" empty-text="Sorry! This category have nothing data.">
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="card" label="ID Card" show-overflow-tooltip></el-table-column>
      <el-table-column prop="city" label="city" show-tooltip-when-overflow></el-table-column>
      <el-table-column prop="postcode" label="zip" width="70"></el-table-column>
      <el-table-column prop="tel" label="tel" width="110"></el-table-column>
      <el-table-column prop="mobile" label="mobile" width="105"></el-table-column>
      <el-table-column prop="fax" label="fax" width="110"></el-table-column>
      <el-table-column prop="email" label="email" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qq" label="QQ" width="110"></el-table-column>
      <el-table-column prop="company" label="company" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { contacts } from '@/services/contacts'
import { Dater } from '@/tools'

export default {
  name: 'Export',
  data() {
    return {
      filenameDefault: `xlsx-${Dater.format(new Date(), undefined)}`,
      exportOpts: {
        filename: '',
        cellAutoWidth: true,
        type: 'xlsx'
      },
      list: []
    }
  },
  mounted() {
    contacts().then(res => {
      console.log(res)
      this.list = res
    })
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
</style>
