<template>
  <div class="va-body-container">
    <el-table
      v-loading="loading"
      :data="list"
      :default-sort="{prop: 'display', order: 'descending'}"
      tooltip-effect="theme"
      fit
      highlight-current-row
      empty-text="Sorry! This category have nothing data."
    >
      <el-table-column type="index" width="36" align="right" sortable />
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip sortable />
      <el-table-column label="CREATE" prop="display" width="116" sortable>
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable />
      <el-table-column label="LEVEL" prop="level" width="90" align="center" sortable />
      <el-table-column
        label="STATUS" prop="status" width="100" align="center"
        sortable class-name="has-actions actions-small"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="66" sortable>
        <template slot-scope="scope">
          {{ scope.row.pv | numberShort }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
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
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  name: 'Sortable',
  metaInfo: { title: 'Sortable table' },
  mixins: [mixins]
}
</script>
