<template>
  <div class="va-body-container">
    <ElForm ref="formFilter" :model="filterData" class="filter-and-actions" inline>
      <ElFormItem>
        <ElInput v-model="filterData.title" placeholder="Title" clearable />
      </ElFormItem>
      <ElFormItem>
        <ElSelect v-model="filterData.status" value="" placeholder="Status" style="width: 120px;">
          <ElOption v-for="(st, i) in statusMap" :key="st" :label="st" :value="i === 0 ? null : st" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElSelect v-model="filterData.level" value="" placeholder="Level" style="width: 80px;">
          <ElOption v-for="(lv, i) in levelMap" :key="lv" :label="lv" :value="i === 0 ? null : lv" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" icon="el-icon-search" @click="getList">
          Search
        </ElButton>
      </ElFormItem>
      <ElFormItem>
        <ElButtonGroup style="vertical-align: top;">
          <ElButton type="primary" icon="el-icon-plus" @click="handleEdit()">
            Add
          </ElButton>
          <ElButton
            :disabled="!selected || selected.length < 1"
            type="primary"
            icon="el-icon-check"
            @click="handleBatchUpdate(true)"
          >
            Audit
          </ElButton>
          <ElButton
            :disabled="!selected || selected.length < 1"
            type="primary"
            icon="el-icon-delete"
            @click="handleBatchUpdate(false)"
          >
            Delete
          </ElButton>
        </ElButtonGroup>
      </ElFormItem>
    </ElForm>

    <ElTable
      v-loading="loading"
      :data="list"
      :default-sort="{prop: 'id', order: 'ascending'}"
      fit
      tooltip-effect="theme"
      highlight-current-row
      empty-text="Sorry! This category have nothing data."
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn type="selection" width="38" />
      <ElTableColumn label="ID" prop="id" width="38" align="right" />
      <ElTableColumn label="TITLE" prop="title" show-overflow-tooltip sortable />
      <ElTableColumn label="CREATE" prop="display" width="114" sortable>
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable />
      <ElTableColumn label="AUDITOR" prop="auditor" width="110" show-overflow-tooltip sortable />
      <ElTableColumn label="LEVEL" prop="level" width="90" align="center" sortable />
      <ElTableColumn label="STATUS" prop="status" width="100" align="center" sortable>
        <template slot-scope="scope">
          <ElTag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="PV" prop="pv" width="66" sortable>
        <template slot-scope="scope">
          {{ scope.row.pv | pageview }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="ACTIONS" width="164" class-name="has-actions actions-small">
        <template slot-scope="scope">
          <ElButton type="primary" size="small" icon="el-icon-check" @click="handleBatchUpdate(true, scope.row)" />
          <ElButton type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)" />
          <ElButton type="primary" size="small" icon="el-icon-delete" @click="handleBatchUpdate(false, scope.row)" />
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

    <ElDialog :visible.sync="dialogVisible" :title="`Article ${editForm.isEdit ? 'Edit' : 'Add'}`" width="50%">
      <ElForm :model="editForm" label-width="80px" style="margin-right: 60px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="editForm.title" placeholder="Article title" />
        </ElFormItem>
        <ElFormItem label="Summery" prop="summery">
          <ElInput v-model="editForm.summery" placeholder="Article summery" />
        </ElFormItem>
        <ElFormItem label="Content" prop="content">
          <ElInput v-model="editForm.content" placeholder="Article content" />
        </ElFormItem>
        <ElFormItem label="Level" prop="level">
          <ElSelect v-model="editForm.level" value placeholder="Article level">
            <template v-for="(lv, i) in levelMap">
              <ElOption v-if="i !== 0" :key="lv" :label="lv" :value="lv" />
            </template>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Auditor" prop="auditor">
          <ElAutocomplete
            v-model="editForm.auditor"
            :debounce="0"
            :fetch-suggestions="inputQuerySearch"
            placeholder="Article auditor"
          />
        </ElFormItem>
      </ElForm>
      <div slot="footer">
        <ElButton plain @click="dialogVisible = false">
          Cancel
        </ElButton>
        <ElButton type="primary">
          Submit
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<script>
import mixins from './mixins'
import Service from '@/services/articles'

export default {
  name: 'FullFeature',
  metaInfo: { title: 'Sortable table' },
  mixins: [mixins],
  data() {
    return {
      filterData: { title: '', status: '', level: '' },
      statusMap: ['all', 'draft', 'committed', 'failing', 'auditing', 'audited', 'deleted'],
      levelMap: ['all', 1, 2, 3, 4, 5],
      selected: [],
      dialogVisible: false,
      auditors: [],
      editForm: null
    }
  },
  created() {
    this.rebuildEditData()
  },
  mounted() {
    Service.auditors().then(res => {
      this.auditors = res.map(v => {
        this.$set(v, 'value', v.username)
        return v
      })
    })
  },
  methods: {
    getList() {
      this.loading = true
      Service.list(Object.assign({}, this.pages, this.filterData)).then(res => {
        this.list = res.list.map(v => {
          this.$set(v, 'editing', false)
          this.$set(v, 'submitting', false)
          this.$set(v, 'originalTitle', v.title)
          return v
        })
        this.pages = res.pages
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    rebuildEditData() {
      this.editForm = {
        isEdit: false,
        author: this.$store.getters.user.username,
        title: '',
        summery: '',
        content: '',
        level: '',
        auditor: ''
      }
    },
    handleEdit(rowData) {
      this.dialogVisible = true
      if (rowData) this.editForm = Object.assign({}, rowData)
      else this.rebuildEditData()
    },
    inputQueryFilter(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    inputQuerySearch(str, callback) {
      const res = str ? this.auditors.filter(this.inputQueryFilter(str)) : this.auditors
      callback(res)
    },
    handleBatchUpdate(isAudit, rowData) {
      const status = { status: isAudit ? 'audited' : 'deleted' }
      let lst = []
      if (rowData) {
        lst = [Object.assign({}, rowData, status)]
      } else {
        this.selected.forEach(v => {
          lst.push(Object.assign({}, v, status))
        })
      }
      const options = {
        type: isAudit ? 'info' : 'warning',
        confirmButtonText: 'Sure, Go Ahead',
        cancelButtonText: 'Cancel',
        callback: action => {
          if (action === 'confirm') {
            Service.updates(lst).then(res => {
              this.$message({
                center: true,
                type: res.success ? 'success' : 'error',
                message: `${isAudit ? 'Audit' : 'Delete'} executed ${res.success ? 'successfully' : 'failed'}.`
              })
              if (res.success) {
                if (rowData) rowData.status = status.status
                else this.selected.forEach((v, i) => { this.selected[i].status = status.status })
              }
            })
          }
        }
      }
      this.$confirm(
        `Are you sure you want to ${isAudit ? 'audit' : 'delete'} ${lst.length > 1 ? 'these' : 'this'} data?`,
        'Are you sure?',
        options
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.filter-and-actions {
  // margin-bottom: $spacer-base;
}
.has-actions .el-button + .el-button {
  margin-left: 2px;
}
</style>
