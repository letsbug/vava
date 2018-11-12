<template>
  <div class="va-body-container">
    <el-table tooltip-effect="light" :data="list" fit highlight-current-row v-loading="loading" row-key="id"
              empty-text="Sorry! This category have nothing data.">
      <el-table-column label="ID" prop="id" width="36" align="right"></el-table-column>
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="CREATE" prop="display" width="148">
        <template slot-scope="scope">{{ scope.row.display | dateAgo }}</template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip></el-table-column>
      <el-table-column label="LEVEL" prop="level" width="60" align="center"></el-table-column>
      <el-table-column label="STATUS" prop="status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | articleStatus">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="60">
        <template slot-scope="scope">{{ scope.row.pv | articlePV }}</template>
      </el-table-column>
      <!--<el-table-column label="ACTIONS" width="90" align="center">
        <template slot-scope="scope">
        </template>
      </el-table-column>-->
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
import Service from '@/services/articles'

export default {
  name: 'Editable',
  metaInfo: { title: 'Editable Table' },
  data() {
    return {
      pages: {
        page: 1,
        size: 10,
        total: 0
      },
      list: [],
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      Service.list(this.pages).then(res => {
        this.loading = false
        this.list = res.list
        this.pages = res.pages
      })
    },
    handlePageChange(val) {
      this.pages.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
