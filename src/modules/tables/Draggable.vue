<template>
  <div class="va-body-container">
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="theme"
      fit
      highlight-current-row
      row-key="id"
      empty-text="Sorry! This category have nothing data."
    >
      <el-table-column type="index" width="42" align="right" />
      <el-table-column label="TITLE" prop="title" show-overflow-tooltip />
      <el-table-column label="CREATE" prop="display" width="116">
        <template slot-scope="scope">
          {{ scope.row.timestamp | parseTimeGap }}
        </template>
      </el-table-column>
      <el-table-column label="AUTHOR" prop="author" width="96" show-overflow-tooltip />
      <el-table-column label="FROM" prop="source" width="90" align="center" />
      <el-table-column label="STATUS" prop="status" width="100" align="center" class-name="has-actions actions-small">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatusStyles" size="small">
            {{ scope.row.status | articleStatusNames }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PAGEVIEWS" prop="pv" width="106" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews | numberShort }}
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

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import TableDemoMixins from './mixins';
import { apiList } from '@/apis/articles';
import Sortable, { SortableEvent } from 'sortablejs';

@Component({ name: 'Draggable' })
export default class extends mixins(TableDemoMixins) {
  // metaInfo: { title: 'Draggable Table' }

  private sortSetup() {
    const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
    Sortable.create(el as HTMLElement, {
      handle: '.handle-drag',
      ghostClass: 'sortable-ghost',
      animation: 70,
      setData: dataTransfer => {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '');
      },
      onEnd: (evt: SortableEvent) => {
        const targetRow = this.list.splice(evt.oldIndex!, 1)[0];
        this.list.splice(evt.newIndex!, 0, targetRow);
      }
    });
  }

  getList() {
    this.loading = true;
    apiList(this.page, this.limit).then((res: any) => {
      this.list = res.data;
      this.total = res.page.total;
      this.$nextTick(() => {
        this.sortSetup();
      });
      this.loading = false;
    });
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';
.handle-drag {
  font-size: 19px;
  cursor: move;
  vertical-align: -4px;
}
</style>
