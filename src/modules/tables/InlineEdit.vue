<template>
  <div class="va-body-container">
    <ElTable
      v-loading="loading" :data="list" tooltip-effect="theme" fit
      highlight-current-row row-key="id" empty-text="Sorry! This category have nothing data."
    >
      <ElTableColumn label="ID" prop="id" width="36" align="right" />
      <ElTableColumn label="TITLE" prop="title" show-overflow-tooltip class-name="has-actions actions-small">
        <template slot-scope="scope">
          <TransitionGroup name="transform-fade">
            <span v-if="scope.row.editing" key="edit" class="inline-edit-form">
              <ElInput v-model="scope.row.title" size="small" />
              <ElButton
                :disabled="scope.row.submitting" icon="el-icon-close" type="danger" plain
                size="small" @click="handleCancel(scope.row)"
              >
                Cancel
              </ElButton>
            </span>
            <span v-else key="cancel" style="line-height: 27px;">
              {{ scope.row.title }}
            </span>
          </TransitionGroup>
        </template>
      </ElTableColumn>
      <ElTableColumn label="CREATE" prop="display" width="110">
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="LEVEL" prop="level" width="60" align="center" />
      <ElTableColumn
        label="STATUS" prop="status" width="100" align="center"
        class-name="has-actions actions-small table-status"
      >
        <template slot-scope="scope">
          <ElTag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="AUTHOR" prop="author" width="96" show-overflow-tooltip />
      <ElTableColumn label="AUDITOR" prop="auditor" width="96" show-overflow-tooltip />
      <ElTableColumn label="PV" prop="pv" width="60">
        <template slot-scope="scope">
          {{ scope.row.pv | pageview }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="ACTIONS" width="90" align="center" class-name="has-actions table-actions actions-small">
        <template slot-scope="scope">
          <ElButton
            v-if="scope.row.editing" :loading="scope.row.submitting"
            icon="el-icon-check" type="success" plain size="small"
            @click="handleEdit(scope.row)"
          >
            OK
          </ElButton>
          <ElButton v-else icon="el-icon-edit" type="primary" plain size="small" @click="scope.row.editing = true">
            Edit
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      v-if="list && list.length > 0"
      :page-sizes="[10, 30, 50]"
      :current-page="pages.page"
      :page-size="pages.size"
      :total="pages.total"
      class="excel-pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
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
