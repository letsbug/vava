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
    <el-table></el-table>
  </div>
</template>

<script>
import { Dater } from '@/tools'

export default {
  name: 'Export',
  data() {
    return {
      filenameDefault: `Now-${Dater.format(new Date(), undefined)}`,
      exportOpts: {
        filename: '',
        cellAutoWidth: true,
        type: 'xlsx'
      },
      list: []
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

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
