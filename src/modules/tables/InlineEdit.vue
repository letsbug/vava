<template>
  <div class="va-body-container">
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="theme"
      fit
      highlight-current-row
      row-key="id"
      empty-text="Sorry! This category have nothing data."
    >
      <el-table-column type="index" width="36" align="right" />
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip class-name="has-actions actions-small">
        <template slot-scope="scope">
          <transition-group name="transform-fade">
            <span v-if="scope.row.editing" key="edit" class="inline-edit-form">
              <el-input v-model="scope.row.title" size="small" />
              <el-button
                :disabled="scope.row.submitting"
                icon="el-icon-close"
                type="danger"
                plain
                size="small"
                @click="handleCancel(scope.row)"
              >
                Cancel
              </el-button>
            </span>
            <span v-else key="cancel" style="line-height: 27px;">
              {{ scope.row.title }}
            </span>
          </transition-group>
        </template>
      </el-table-column>
      <el-table-column label="CREATE" prop="display" width="116">
        <template slot-scope="scope">
          {{ scope.row.timestamp | parseTimeGap }}
        </template>
      </el-table-column>
      <el-table-column label="FROM" prop="source" width="90" align="center" />
      <el-table-column
        label="STATUS"
        prop="status"
        width="100"
        align="center"
        class-name="has-actions actions-small table-status"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatusStyles" size="small">
            {{ scope.row.status | articleStatusNames }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip />
      <el-table-column label="AUDITOR" prop="auditor" width="96" show-overflow-tooltip />
      <el-table-column label="PAGEVIEWS" prop="pv" width="106" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews | numberShort }}
        </template>
      </el-table-column>
      <el-table-column label="ACTIONS" width="100" align="center" class-name="has-actions table-actions actions-small">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.editing"
            :loading="scope.row.submitting"
            icon="el-icon-check"
            type="success"
            plain
            size="small"
            @click="handleEdit(scope.row)"
          >
            OK
          </el-button>
          <el-button v-else icon="el-icon-edit" type="primary" plain size="small" @click="scope.row.editing = true">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="list && list.length > 0"
      :page-sizes="[10, 30, 50]"
      :current-page="page"
      :page-size="limit"
      :total="total"
      class="excel-pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import TableDemoMixins from './mixins';
import { apiUpdate } from '@/apis/articles';

@Component({ name: 'InlineEdit' })
export default class extends mixins(TableDemoMixins) {
  // metaInfo: { title: 'Editable Table' },
  handleEdit(row: any) {
    row.submitting = true;
    row.originalTitle = row.title;
    apiUpdate({ id: row.id, title: row.title }).then((res: any) => {
      if (res.success) row.editing = false;
      this.$message({
        type: res.success ? 'success' : 'error',
        message: res.success ? 'Modify successfully' : res.message,
        center: true
      });
      row.submitting = false;
    });
  }

  handleCancel(row: any) {
    row.title = row.originalTitle;
    row.editing = false;
  }
}
</script>

<style scoped lang="scss">
.inline-edit-form {
  display: inline-block;
  width: 100%;
  position: relative;
  padding-right: 90px;

  /deep/ .el-input__inner {
    height: 33px;
    line-height: 31px;
  }

  .el-button {
    position: absolute;
    right: 0;
  }
}
</style>
