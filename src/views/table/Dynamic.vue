<template>
  <div class="container-body table">
    <h3 class="page-title">Dynamic Table
      <small class="text-muted">Refers to the table component of the <a :href="url_document" target="_blank">element
        ui</a>, Simulate Data is driven by <a :href="url_mockjs" target="_blank">mock.js</a>.</small>
    </h3>
    <hr>
    <br>
    <el-form inline class="search-form" @submit.prevent="handleSearch">
      <el-form-item>
        <el-input placeholder="请输入搜索关键字" v-model="keyword" @keyup.enter.native="handleSearch">
          <i slot="suffix" class="el-input__icon el-icon-search" @click.prevent="handleSearch"></i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table ref="dynamicTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="42"></el-table-column>
      <el-table-column prop="date" label="Birthday" width="94"></el-table-column>
      <el-table-column prop="name" label="Name" width="78">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone" width="90"></el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.address}}</template>
      </el-table-column>
      <el-table-column prop="zip" label="Postcode" width="72"></el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :pager-count="pagerCount"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.limit"
      :layout="layout"
      :total="page.total">
    </el-pagination>
    <br>
  </div>
</template>

<script>
import { formatDate } from '@/utilities'
import { clientList } from '@/api/clients'
import PaginationResponsive from '@/utilities/PaginationResponsive'

export default {
  name: "Dynamic",
  mixins: [PaginationResponsive],
  data() {
    return {
      url_document: 'http://element-cn.eleme.io/#/zh-CN/component/table',
      url_mockjs: 'http://mockjs.com/',
      keyword: '',
      page: { current: 1, limit: 10, total: 0 },
      layout: 'total, sizes, prev, pager, next, jumper',
      pagerCount: 7,
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      clientList(this.page.current, this.page.limit, this.keyword).then(res => {
        this.page = res.page
        this.tableData = res.data.map(v => {
          // format date
          let date = v.date
          if(typeof date === 'number') date = new Date(date)
          v.date = formatDate(date, 'yyyy-MM-dd')
          return v
        })
      })
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      console.log(this.page.current)
      this.page.current = val
      this.handleSearch()
    },
    handleSearch() {
      this.list()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>
