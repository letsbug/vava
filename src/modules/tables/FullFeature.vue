<template>
  <div class="va-body-container">
    <el-form ref="formFilter" :model="filterData" class="filter-and-actions" inline>
      <el-form-item>
        <el-input v-model="filterData.title" placeholder="Title" clearable />
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterData.status" value="" placeholder="Status" style="width: 120px;">
          <el-option v-for="(st, i) in statusMap" :key="st" :label="st" :value="i" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filterData.author" placeholder="Author" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">
          Search
        </el-button>
      </el-form-item>
      <el-form-item class="float-r">
        <el-button-group style="vertical-align: top;">
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">
            Add
          </el-button>
          <el-button
            :disabled="!selected || selected.length < 1"
            type="primary"
            icon="el-icon-check"
            @click="handleBatchUpdate(true)"
          >
            Audit
          </el-button>
          <el-button
            :disabled="!selected || selected.length < 1"
            type="primary"
            icon="el-icon-delete"
            @click="handleBatchUpdate(false)"
          >
            Delete
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="list"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      fit
      tooltip-effect="theme"
      highlight-current-row
      empty-text="Sorry! This category have nothing data."
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="42" />
      <el-table-column type="index" width="42" align="center" />
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip sortable />
      <el-table-column label="CREATE" prop="timestamp" width="116" sortable>
        <template slot-scope="scope">
          {{ scope.row.timestamp | parseTimeGap }}
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable />
      <el-table-column label="AUDITOR" prop="auditor" width="110" show-overflow-tooltip sortable />
      <el-table-column label="FROM" prop="source" width="90" align="center" sortable />
      <el-table-column
        label="STATUS"
        prop="status"
        width="100"
        align="center"
        sortable
        class-name="has-actions actions-small"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatusStyles" size="small">
            {{ scope.row.status | articleStatusNames }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PAGEVIEWS" prop="pageviews" width="126" sortable align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews | numberShort }}
        </template>
      </el-table-column>
      <el-table-column label="ACTIONS" width="165" class-name="has-actions actions-small">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-check"
            :disabled="scope.row.status === 4"
            @click="handleBatchUpdate(true, scope.row)"
          />
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)" />
          <el-button type="primary" size="small" icon="el-icon-delete" @click="handleBatchUpdate(false, scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="list && list.length >= limit"
      :page-sizes="sizes"
      :current-page="page"
      :page-size="limit"
      :total="total"
      class="excel-pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

    <el-dialog :visible.sync="dialogVisible" :title="`Article ${editForm.isEdit ? 'Edit' : 'Add'} Form`" width="50%">
      <el-form :model="editForm" label-width="80px" style="margin-right: 60px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="editForm.title" placeholder="Article title" />
        </el-form-item>
        <el-form-item label="Summery" prop="summery">
          <el-input v-model="editForm.summery" placeholder="Article summery" />
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input v-model="editForm.content" placeholder="Article content" />
        </el-form-item>
        <el-form-item label="Auditor" prop="auditor">
          <el-autocomplete
            v-model="editForm.auditor"
            :debounce="0"
            :fetch-suggestions="inputQuerySearch"
            placeholder="Article auditor"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button plain @click="dialogVisible = false">
          Cancel
        </el-button>
        <el-button type="primary">
          Submit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import TableDemoMixins from './mixins';
import { apiList, apiUpdates } from '@/apis/articles';
import { MessageType } from 'element-ui/types/message';
import { IStoreUser } from '@/store/modules/user';

const statusMap = ['all status', 'draft', 'committed', 'failing', 'auditing', 'audited', 'deleted'];

@Component({ name: 'FullFeature' })
export default class extends mixins(TableDemoMixins) {
  // metaInfo: { title: 'Sortable table' }

  statusMap = statusMap;
  filterData = { title: '', status: 0, author: '' };
  levelMap = ['all', 1, 2, 3, 4, 5];
  selected: any[] = [];
  dialogVisible = false;
  auditors: any[] = ['Tom', 'Karen', 'Jennifer', 'Anna', 'Peter'];
  editForm: any = null;

  created() {
    this.rebuildEditData();
  }

  mounted() {
    this.auditors = this.auditors.map((v: any) => {
      return { value: v };
    });
  }

  getList() {
    this.loading = true;
    let { title, author, status } = this.filterData;
    apiList(this.page, this.limit, title, author, status === 0 ? undefined : status - 1).then((res: any) => {
      if (!res.success) return;
      this.list = res.data.map((v: any) => {
        this.$set(v, 'editing', false);
        this.$set(v, 'submitting', false);
        this.$set(v, 'originalTitle', v.title);
        return v;
      });
      // this.pages = res.pages;
      this.total = res.page.total;
      this.loading = false;
    });
  }
  handleSelectionChange(val: any[]) {
    this.selected = val;
  }
  rebuildEditData() {
    this.editForm = {
      isEdit: false,
      author: IStoreUser.username,
      title: '',
      summery: '',
      content: '',
      auditor: ''
    };
  }
  handleEdit(rowData: any) {
    this.dialogVisible = true;
    if (rowData) this.editForm = Object.assign({}, rowData);
    else this.rebuildEditData();
  }
  inputQueryFilter(queryString: string) {
    return (restaurant: any) => {
      return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
  }
  inputQuerySearch(str: string, callback: Function) {
    const res = str ? this.auditors.filter(this.inputQueryFilter(str)) : this.auditors;
    callback(res);
  }
  handleBatchUpdate(isAudit: boolean, rowData: any) {
    const status = { status: isAudit ? 'audited' : 'deleted' };
    let lst: any[] = [];
    if (rowData) {
      lst = [Object.assign({}, rowData, status)];
    } else {
      this.selected.forEach(v => {
        lst.push(Object.assign({}, v, status));
      });
    }
    const options = {
      type: (isAudit ? 'info' : 'warning') as MessageType,
      confirmButtonText: 'Sure, Go Ahead',
      cancelButtonText: 'Cancel',
      callback: (action: string) => {
        if (action === 'confirm') {
          apiUpdates(lst).then((res: any) => {
            this.$message({
              center: true,
              type: res.success ? 'success' : 'error',
              message: `${isAudit ? 'Audit' : 'Delete'} executed ${res.success ? 'successfully' : 'failed'}.`
            });
            if (res.success) {
              if (rowData) rowData.status = status.status;
              else
                this.selected.forEach((v, i) => {
                  this.selected[i].status = status.status;
                });
            }
          });
        }
      }
    };
    this.$confirm(
      `Are you sure you want to ${isAudit ? 'audit' : 'delete'} ${lst.length > 1 ? 'these' : 'this'} data?`,
      'Are you sure?',
      options
    );
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.filter-and-actions {
  // margin-bottom: $spacer-base;
}
.has-actions .el-button + .el-button {
  margin-left: 2px;
}
</style>
