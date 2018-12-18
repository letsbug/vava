<template>
  <div class="va-body-container">
    <ElTable
      v-loading="loading"
      :data="list"
      :default-sort="{prop: 'display', order: 'descending'}"
      tooltip-effect="theme"
      fit
      highlight-current-row
      empty-text="Sorry! This category have nothing data."
    >
      <ElTableColumn label="ID" prop="id" width="60" align="right" sortable />
      <ElTableColumn label="TITLE" prop="title" show-overflow-tooltip sortable />
      <ElTableColumn label="CREATE" prop="display" width="110" sortable>
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="AUTHOR" prop="author" width="104" show-overflow-tooltip sortable />
      <ElTableColumn label="LEVEL" prop="level" width="90" align="center" sortable />
      <ElTableColumn label="STATUS" prop="status" width="100" align="center" sortable>
        <template slot-scope="scope">
          <ElTag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="PV" prop="pv" width="66" sortable>
        <template slot-scope="scope">
          {{ scope.row.pv | pageview }}
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
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
