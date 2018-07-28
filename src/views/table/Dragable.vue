<template>
  <div class="container-body table">
    <h3 class="page-title">Drag Table <small class="text-muted">Refers to the table component of the
      <a :href="url_document" target="_blank">element ui</a></small></h3>
    <hr>
    <blockquote>
      <p>此功能依赖于<code>sortablejs</code>拖拽排序插件，详细使用方法请移步<a :href="url_sortablejs" target="_blank">官方文档</a></p>
    </blockquote>
    <el-table id="dragTable" ref="dragTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Birthday" width="94"></el-table-column>
      <el-table-column prop="name" label="Name" width="78">
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
import Sortable from 'sortablejs'

export default {
  name: "Dragable",
  data() {
    return {
      url_document: 'http://element-cn.eleme.io/#/zh-CN/component/table',
      url_sortablejs: 'http://rubaxa.github.io/Sortable/',
      page: { current: 1, limit: 8 },
      tableData: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    sort() {
      const els = document.querySelectorAll('#dragTable .el-table__body-wrapper table > tbody')[0]
      Sortable.create(els, {
        handle: '.action-drag',
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        animation: 150,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        }
      });

    },
    list() {
      clientList(this.page.current, this.page.limit, null).then(res => {
        this.page = res.page
        this.tableData = res.data.map(v => {
          let date = v.date
          if(typeof date === 'number') date = new Date(date)
          v.date = formatDate(date, 'yyyy-MM-dd')
          return v
        })
        this.$nextTick(() => { this.sort() })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  .sortable-ghost{
    opacity: .7;
    color: $white!important;
    background: $color-green-200!important;
  }
</style>
