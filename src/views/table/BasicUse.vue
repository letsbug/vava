<template>
  <div class="container-body table">
    <h3 class="page-title">Basic Tables <small class="text-muted">Refers to the table component of the
      <a href="http://element-cn.eleme.io/#/zh-CN/component/table" target="_blank">element ui</a></small></h3>
    <hr>
    <blockquote>
      <p><code>stripe</code>属性可以创建带斑马纹的表格。它接受一个<code>Boolean</code>，默认为<code>false</code>，设置为<code>true</code>即为启用。</p>
    </blockquote>
    <el-table ref="basicTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="90"></el-table-column>
      <el-table-column prop="name" label="Name" width="78"></el-table-column>
      <el-table-column prop="phone" label="Phone" width="90"></el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <blockquote>
      <p><code>bordered</code>默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用<code>border</code>属性，它接受一个<code>Boolean</code>，设置为<code>true</code>即可启用。</p>
    </blockquote>
    <el-table ref="basicTable" tooltip-effect="light" :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="90"></el-table-column>
      <el-table-column prop="name" label="Name" width="78"></el-table-column>
      <el-table-column prop="phone" label="Phone" width="90"></el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="Status" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTransStyle">{{scope.row.status | statusTransName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import { formatDate } from '@/utilities'
import { clientList } from '@/api/clients'

export default {
  name: "BasicUse",
  data() {
    return {
      document_url: 'http://element-cn.eleme.io/#/zh-CN/component/table',
      page: { current: 1, limit: 4 },
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
          return v
        })
      })
    }
  }
}
</script>
