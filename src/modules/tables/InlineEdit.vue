<template>
  <div class="va-body-container">
    <el-table tooltip-effect="light" :data="list" fit highlight-current-row v-loading="loading" row-key="id"
              empty-text="Sorry! This category have nothing data.">
      <el-table-column label="ID" prop="id" width="36" align="right"></el-table-column>
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip class-name="has-actions actions-small">
        <template slot-scope="scope">
          <transition-group name="transform-fade">
            <span class="inline-edit-form" v-if="scope.row.editing" key="edit">
              <el-input size="small" v-model="scope.row.title"/>
              <el-button icon="el-icon-close" type="danger" plain size="small" @click="handleCancel(scope.row)"
                         :disabled="scope.row.submitting">Cancel
              </el-button>
            </span>
            <span v-else key="cancel" style="line-height: 27px;">{{ scope.row.title }}</span>
          </transition-group>
        </template>
      </el-table-column>
      <el-table-column label="CREATE" prop="display" width="110">
        <template slot-scope="scope">{{ scope.row.display | dateAgo }}</template>
      </el-table-column>
      <el-table-column label="LEVEL" prop="level" width="60" align="center"></el-table-column>
      <el-table-column label="STATUS" prop="status" width="100" align="center" class-name="has-actions actions-small table-status">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | articleStatus">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip></el-table-column>
      <el-table-column label="AUDITOR" prop="auditor" width="96" show-overflow-tooltip></el-table-column>
      <el-table-column label="PV" prop="pv" width="60">
        <template slot-scope="scope">{{ scope.row.pv | articlePV }}</template>
      </el-table-column>
      <el-table-column label="ACTIONS" width="90" align="center" class-name="has-actions table-actions actions-small">
        <template slot-scope="scope">
          <el-button icon="el-icon-check" type="success" plain size="small" @click="handleEdit(scope.row)"
                     v-if="scope.row.editing" :loading="scope.row.submitting">OK</el-button>
          <el-button icon="el-icon-edit" type="primary" plain size="small" @click="scope.row.editing = true"
                     v-else>Edit</el-button>
        </template>
      </el-table-column>
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
import mixins from './mixins'
import Service from '@/services/articles'

export default {
  name: 'InlineEdit',
  metaInfo: { title: 'Editable Table' },
  mixins: [mixins],
  methods: {
    handleEdit(row) {
      row.submitting = true
      row.originalTitle = row.title
      Service.update({ id: row.id, title: row.title }).then(res => {
        if (res.success) row.editing = false
        this.$message({
          type: res.success ? 'success' : 'error',
          message: res.success ? 'Modify successfully' : res.message,
          center: true
        })
        row.submitting = false
      })
    },
    handleCancel(row) {
      row.title = row.originalTitle
      row.editing = false
    }
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
