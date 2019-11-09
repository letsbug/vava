<template>
  <div class="va-body-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <h6>Upload</h6>
        <el-upload />
      </el-col>
      <el-col :span="8">
        <h6>Position</h6>
      </el-col>
      <el-col :span="8">
        <h6>Attributes</h6>
      </el-col>
    </el-row>

    <div class="preview">
      <h6>Preview</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'WatermarkDemo' })
export default class extends Vue {}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.el-row h6 {
  margin-top: 0;
}
</style>
