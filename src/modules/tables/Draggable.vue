<template>
  <div class="va-body-container">
    <el-table tooltip-effect="light" :data="list" fit highlight-current-row v-loading="loading" row-key="id"
              border empty-text="Sorry! This category have nothing data." height="549px">
      <el-table-column label="ID" prop="id" width="40" align="right"></el-table-column>
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="CREATE" prop="display" width="110">
        <template slot-scope="scope">{{ scope.row.display | dateAgo }}</template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip></el-table-column>
      <el-table-column label="LEVEL" prop="level" width="60" align="center"></el-table-column>
      <el-table-column label="STATUS" prop="status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | articleStatus">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="66">
        <template slot-scope="scope">{{ scope.row.pv | articlePV }}</template>
      </el-table-column>
      <el-table-column label="DRAG" width="66" align="center">
        <template slot-scope="scope">
          <span class="handle-drag"><va-icon icon="action-drag"></va-icon></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Service from '@/services/articles'
import Sortable from 'sortablejs'

export default {
  name: 'Draggable',
  metaInfo: { title: 'Draggable Table' },
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
    sortSetup() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      Sortable.create(el, {
        handle: '.handle-drag',
        ghostClass: 'sortable-ghost',
        animation: 70,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
        }
      })
    },
    getList() {
      this.loading = true
      Service.list(this.pages).then(res => {
        this.loading = false
        this.list = res.list
        this.pages = res.pages
        this.$nextTick(() => this.sortSetup())
      })
    }
  },
  computed: {},
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.handle-drag {
  font-size: 19px;
  cursor: move;
  vertical-align: -4px;
}
</style>
