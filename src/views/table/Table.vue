<template>
  <div class="container-body table">
    <h3 class="page-title">Basic Tables <small class="text-muted">Refers to the table component of the
      <a href="http://element-cn.eleme.io/#/zh-CN/component/table" target="_blank">element ui</a></small></h3>
    <hr>
    <h4 class="page-title-sub">Simple Table</h4>
    <blockquote>
      <p>默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用<code>border</code>属性，它接受一个<code>Boolean</code>，设置为<code>true</code>即可启用。</p>
    </blockquote>
    <el-table ref="multipleTable" tooltip-effect="light" :data="tableData" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="42"></el-table-column>
      <el-table-column prop="date" label="日期" width="90"></el-table-column>
      <el-table-column prop="name" label="姓名" width="90"></el-table-column>
      <el-table-column prop="phone" label="电话" width="90"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', phone: '189****7721', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', phone: '189****7722', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', phone: '189****7723', address: '上海市普陀区金沙江路 1519 弄 | 上海市普陀区金沙江路 1519 弄 | 上海市普陀区金沙江路 1519 弄 | 上海市普陀区金沙江路 1519 弄 | 上海市普陀区金沙江路 1519 弄' },
        { date: '2016-05-03', name: '王小虎', phone: '189****7724', address: '上海市普陀区金沙江路 1516 弄' }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>
