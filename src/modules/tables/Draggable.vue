<template>
  <div class="va-body-container">
    <ElTable
      v-loading="loading" :data="list" tooltip-effect="theme" fit
      highlight-current-row row-key="id" empty-text="Sorry! This category have nothing data."
    >
      <ElTableColumn label="ID" prop="id" width="40" align="right" />
      <ElTableColumn label="TITLE" prop="title" show-overflow-tooltip />
      <ElTableColumn label="CREATE" prop="display" width="110">
        <template slot-scope="scope">
          {{ scope.row.display | dateAgo }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="AUTHOR" prop="author" width="96" show-overflow-tooltip />
      <ElTableColumn label="LEVEL" prop="level" width="60" align="center" />
      <ElTableColumn label="STATUS" prop="status" width="100" align="center">
        <template slot-scope="scope">
          <ElTag :type="scope.row.status | articleStatus" size="small">
            {{ scope.row.status }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="PV" prop="pv" width="66">
        <template slot-scope="scope">
          {{ scope.row.pv | pageview }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="DRAG" width="66" align="center">
        <template>
          <span class="handle-drag">
            <VaIcon icon="action-drag" />
          </span>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script>
import mixins from './mixins'
import Service from '@/services/articles'
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
        setData(dataTransfer) {
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
        this.list = res.list
        this.pages = res.pages
        this.$nextTick(() => this.sortSetup())
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
