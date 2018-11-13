<template>
  <div class="va-body-container">
    <el-table tooltip-effect="light" :data="list" fit highlight-current-row v-loading="loading"
              :default-sort = "{prop: 'display', order: 'descending'}"
              empty-text="Sorry! This category have nothing data." height="549px">
      <el-table-column label="ID" prop="id" width="60" align="right" sortable></el-table-column>
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="CREATE" prop="display" width="110" sortable>
        <template slot-scope="scope">{{ scope.row.display | dateAgo }}</template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="LEVEL" prop="level" width="90" align="center" sortable></el-table-column>
      <el-table-column label="STATUS" prop="status" width="100" align="center" sortable>
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | articleStatus">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="66" sortable>
        <template slot-scope="scope">{{ scope.row.pv | articlePV }}</template>
      </el-table-column>
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
  name: 'Sortable',
  metaInfo: { title: 'Sortable table' },
  data() {
    return {
      pages: { page: 1, size: 10, total: 0 },
      list: [],
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      Service.list(this.pages).then(res => {
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
    handlePageChange(val) {
      this.pages.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getList()
    }
  },
  computed: {},
  mounted() {
    this.getList()
  }
}
</script>
