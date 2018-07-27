<template>
  <div class="container-body table">
    <h3 class="page-title">Basic Tables <small class="text-muted">Refers to the table component of the
      <a href="http://element-cn.eleme.io/#/zh-CN/component/table" target="_blank">element ui</a></small></h3>
    <hr>
    <blockquote>
      <p>默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用<code>border</code>属性，它接受一个<code>Boolean</code>，设置为<code>true</code>即可启用。</p>
    </blockquote>
    <div class="search-form">
      <el-input placeholder="请输入搜索关键字" v-model="keyword">
        <i slot="suffix" class="el-input__icon el-icon-search" @click.prevent="handleSearch"></i>
      </el-input>
    </div>
    <el-table ref="multipleTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="42"></el-table-column>
      <el-table-column prop="date" label="Date" width="90" sortable></el-table-column>
      <el-table-column prop="name" label="Name" width="78" sortable></el-table-column>
      <el-table-column prop="phone" label="Phone" width="90"></el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="edit-content" v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.address"></el-input>
            <el-button class='edit-action' size="mini" circle icon="el-icon-refresh" type="warning"
                       @click="handleCancel(scope.row)"></el-button>
            <span class="tooltip-content">{{scope.row.address}}</span>
          </div>
          <span v-else>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="90" label="Actions">
        <template slot-scope="scope">
          <el-button size="mini" circle icon="el-icon-edit" v-if="!scope.row.edit"
                     @click="scope.row.edit=!scope.row.edit"></el-button>
          <el-button size="mini" type="success" circle icon="el-icon-check" v-if="scope.row.edit"
                     @click="handleEdit(scope.row)"></el-button>
          <el-button size="mini" circle icon="el-icon-delete" type="danger"
                     @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { firstNameBook, formatDate } from '@/utilities'

export default {
  name: "BasicUse",
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    for (let i = 0; i < 6; i++) {
      const obj = this.randomUser(i)
      this.tableData.push(obj)
    }
    this.tableData.map(v => {
      this.$set(v, 'edit', false)
      v.originalAddr = v.address
      return v
    })
  },
  methods: {
    randomUser(i) {
      const dd = Math.floor(Math.random() * 30 + 1)
      const date = new Date()
      date.setDate(date.getDate() - dd)
      let addr = '上海市普陀区金沙江路 1518 弄'
      if (i === 2) addr = addr + ' | ' + addr + ' | ' + addr + ' | ' + addr
      return {
        date: formatDate(date, 'yyyy-MM-dd'),
        name: firstNameBook[i] + ((dd % 2 === 0) ? '小虎' : '大胖'),
        status: Math.floor(Math.random() * 4),
        phone: '189****771' + (dd + '').substr(1),
        address: addr
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCancel(row) {
      row.edit = false
      row.address = row.originalAddr
    },
    handleEdit(row) {
      row.edit = false
      if (row.originalAddr !== row.address) {
        row.originalAddr = row.address
        this.$message({
          type: 'success',
          message: 'This address has been changed.'
        })
      }
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
  .search-form {
    width: 200px;
  }
  table .edit-input {
    padding-right: 43px;
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
