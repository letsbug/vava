<template>
  <div class="va-body-container">
    <el-table
      v-loading="loading" :data="list" tooltip-effect="theme" fit
      highlight-current-row row-key="id" empty-text="Sorry! This category have nothing data."
    >
      <el-table-column type="index" width="36" align="right" />
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip />
      <el-table-column label="CREATE" prop="display" width="116">
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip />
      <el-table-column label="LEVEL" prop="level" width="60" align="center" />
      <el-table-column label="STATUS" prop="status" width="100" align="center" class-name="has-actions actions-small">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PV" prop="pv" width="66">
        <template slot-scope="scope">
          {{ scope.row.pv | numberShort }}
        </template>
      </el-table-column>
      <el-table-column label="DRAG" width="66" align="center">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <va-icon icon="action-drag" class="handle-drag" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixins from './mixins'
import Service from '@/apis/articles'
import Sortable from 'sortablejs'

export default {
  name: 'Draggable',
  metaInfo: { title: 'Draggable Table' },
  mixins: [mixins],
  methods: {
    sortSetup() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      Sortable.create(el, {
        handle: '.handle-drag',
        ghostClass: 'sortable-ghost',
        animation: 70,
        setData: dataTransfer => {
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
        this.list = res.data
        this.pages = res.pages
        this.$nextTick(() => {
          this.sortSetup()
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";
.handle-drag {
  font-size:      19px;
  cursor:         move;
  vertical-align: -4px;
}
</style>
