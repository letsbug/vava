<template>
  <div class="va-body-container">
    <el-form class="filter-and-actions" ref="formFilter" :model="filterData" inline>
      <el-form-item>
        <el-input v-model="filterData.title" placeholder="Title" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterData.status" value="" placeholder="Status" style="width: 120px;">
          <el-option v-for="(st, i) in statusMap" :label="st" :value="i === 0 ? null : st" :key="st"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterData.level" value="" placeholder="Level" style="width: 80px;">
          <el-option v-for="(lv, i) in levelMap" :label="lv" :value="i === 0 ? null : lv" :key="lv"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group style="vertical-align: top;">
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">Add</el-button>
          <el-button type="primary" icon="el-icon-check" :disabled="!selected || selected.length < 1"
                     @click="handleBatchUpdate(true)">Audit</el-button>
          <el-button type="primary" icon="el-icon-delete" :disabled="!selected || selected.length < 1"
                     @click="handleBatchUpdate(false)">Delete</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table tooltip-effect="theme" :data="list" fit highlight-current-row v-loading="loading"
              :default-sort = "{prop: 'id', order: 'ascending'}" @selection-change="handleSelectionChange"
              empty-text="Sorry! This category have nothing data.">
      <el-table-column type="selection" width="38"></el-table-column>
      <el-table-column label="ID" prop="id" width="38" align="right"></el-table-column>
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="CREATE" prop="display" width="114" sortable>
        <template slot-scope="scope">{{ scope.row.display | dateAgo }}</template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="AUDITOR" prop="auditor" width="110" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="LEVEL" prop="level" width="90" align="center" sortable></el-table-column>
      <el-table-column label="STATUS" prop="status" width="100" align="center" sortable>
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | articleStatus">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="66" sortable>
        <template slot-scope="scope">{{ scope.row.pv | articlePV }}</template>
      </el-table-column>
      <el-table-column label="ACTIONS" width="164" class-name="has-actions actions-small">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-check"
                     @click="handleBatchUpdate(true, scope.row)"></el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          <el-button type="primary" size="small" icon="el-icon-delete"
                     @click="handleBatchUpdate(false, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="excel-pagination"
      v-if="list && list.length > 0"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 30, 50]"
      :current-page="pages.page"
      :page-size="pages.size"
      :total="pages.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible" :title="`Article ${editForm.isEdit ? 'Edit' : 'Add'}`" width="50%">
      <el-form :model="editForm" label-width="80px" style="margin-right: 60px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="editForm.title" placeholder="Article title"></el-input>
        </el-form-item>
        <el-form-item label="Summery" prop="summery">
          <el-input v-model="editForm.summery" placeholder="Article summery"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input v-model="editForm.content" placeholder="Article content"></el-input>
        </el-form-item>
        <el-form-item label="Level" prop="level">
          <el-select v-model="editForm.level" value placeholder="Article level">
            <el-option v-for="(lv, i) in levelMap" :label="lv" :value="lv" :key="lv" v-if="i !== 0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Auditor" prop="auditor">
          <el-autocomplete v-model="editForm.auditor" placeholder="Article auditor" :debounce="0"
                    :fetch-suggestions="inputQuerySearch"></el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button plain @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary">Submit</el-button>
      </div>
    </el-dialog>
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
      this.selected = val;
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
                else this.selected.forEach((v, i) => {
                  this.selected[i].status = status.status
                })
              }
            })
          }
        }
      }
      this.$confirm(
        `Are you sure you want to ${ isAudit ? 'audit' : 'delete' } ${lst.length > 1 ? 'these' : 'this'} data?`,
        'Are you sure?',
        options
      )
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
