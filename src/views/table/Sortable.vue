<template>
  <div class="container-body table">
    <h3 class="page-title">Sortable Tables <small class="text-muted">Refers to the table component of the
      <a :href="document_url" target="_blank">element ui</a></small></h3>
    <hr>
    <blockquote>
      <p>在列中设置<code>sortable</code>属性即可实现以该列为基准的排序，接受一个<code>Boolean</code>，默认为<code>false</code>...</p>
      <p>详细文档请移步 <a :href="document_url" target="_blank">element ui</a> 官方文档</p>
    </blockquote>
    <el-table ref="multipleTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="Birthday" width="94" sortable></el-table-column>
      <el-table-column prop="name" label="Name" width="78" sortable>
        <template slot-scope="scope">{{scope.row.name | mergeName}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone" width="90"></el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.address | mergeAddress}}</template>
      </el-table-column>
      <el-table-column prop="zip" label="Postcode" width="72"></el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="Action">
        <template slot-scope="scope">
          <el-button class="action-drag" size="mini" circle type="info" icon="el-icon-rank"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '@/utilities'
import { clientList } from '@/api/clients'

export default {
  name: "Sortable",
  data() {
    return {
      document_url: 'http://element-cn.eleme.io/#/zh-CN/component/table',
      page: { current: 1, limit: 8 },
      keyword: '',
      tableData: []
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
          let date = v.date
          if(typeof date === 'number') date = new Date(date)
          v.date = formatDate(date, 'yyyy-MM-dd')
          return v
        })
        console.log(this.tableData[0])
      })
    }
  }
}
</script>
