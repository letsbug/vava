<template>
  <div class="container-body table">
    <h3 class="page-title">Editable Table <small class="text-muted">Refers to the table component of the
      <a :href="document_url" target="_blank">element ui</a></small></h3>
    <hr>
    <el-table ref="editableTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="Birthday" width="94" sortable>
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.date"></el-input>
          </div>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="78" sortable>
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.name"></el-input>
          </div>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone" width="100">
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.phone"></el-input>
          </div>
          <span v-else>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.address"></el-input>
            <span class="tooltip-content">{{scope.row.address}}</span>
          </div>
          <span v-else>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="Postcode" width="72">
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.zip"></el-input>
          </div>
          <span v-else>{{ scope.row.zip }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="90" label="Actions">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button size="mini" circle icon="el-icon-check" type="success"
                       @click="handleEdit(scope.row)"></el-button>
            <el-button size="mini" circle icon="el-icon-close"
                       @click="handleCancel(scope.row)"></el-button>
          </template>
          <template v-else>
            <el-button size="mini" circle icon="el-icon-edit"
                       @click="scope.row.edit=!scope.row.edit"></el-button>
            <el-button size="mini" circle icon="el-icon-delete" type="danger"
                       @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '@/utilities'
import { clientList } from '@/api/clients'

export default {
  name: "Editable",
  data() {
    return {
      document_url: 'http://element-cn.eleme.io/#/zh-CN/component/table',
      page: { current: 1, limit: 8 },
      tableData: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      clientList(this.page.current, this.page.limit, null).then(res => {
        this.page = res.page
        this.tableData = res.data.map(v => {
          // format date
          let date = v.date
          if(typeof date === 'number') date = new Date(date)
          v.date = formatDate(date, 'yyyy-MM-dd')
          // edit views flag
          this.$set(v, 'edit', false)
          // copy editable values to originals
          v.originals = { address: v.address, date: v.date, name: v.name, phone: v.phone, zip: v.zip }
          return v
        })
      })
    },
    handleCancel(row) {
      row.edit = false
      Object.keys(row.originals).forEach(key => {
        row[key] = row.originals[key]
      })
    },
    handleEdit(row) {
      row.edit = false
      let edited = false
      Object.keys(row.originals).forEach(key => {
        if (row.originals[key] !== row[key]) {
          row.originals[key] = row[key]
          edited = true
        }
      })
      if (edited) this.$message({
        type: 'success',
        dangerouslyUseHTMLString: true,
        message: 'This user info about the <strong>\'' + row.name + '\'</strong> has been modified and updated successfully'
      })
    },
    handleDelete(index, row) {
      this.$confirm('确定删除当前行？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'This Line has been deleted.'
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  table .edit-input {
    height: 28px;
  }
  table .edit-action {
    position: absolute;
    top: 8px;
    right: 12px;
  }
  table .tooltip-content {
    font-size: 0;
    width: 0;
    height: 0;
  }
  table .edit-content {
    height: 28px;
  }
</style>
