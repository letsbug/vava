<template>
  <div class="excel-importer">
    <input ref="excelImportInput" class="excel-import-input" type="file" accept=".xlsx, .xls" @change="onInputFile">
    <div class="file-drop" :class="working ? 'working' : ''"
         @click="(working = true) && $refs['excelImportInput'].click()">
      Drag the excel here or
      <span class="text-primary browse-hint">Browse</span>
      <span class="working-flag"><i class="el-icon-loading"></i></span>
    </div>
  </div>
</template>

<script>
import Xlsx from 'xlsx'

export default {
  props: {
    // Allow import by drag and drop one file
    dragImport: { type: Boolean, default: false },
    beforeImport: { type: Function },
    onSuccess: { type: Function }
  },
  data() {
    return {
      working: false
    }
  },
  methods: {
    onInputFile(e) {
      this.working = false
      const file = e.target.files[0]
      console.log(file)
      // if (!file) return
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

$file-drop-width:   360px;
$file-drop-height:  140px;

.excel-import-input {
  display: none;
}

.file-drop {
  width: $file-drop-width;
  height: $file-drop-height;
  overflow: hidden;
  line-height: $file-drop-height;
  margin: 0 auto;
  border: dashed $border-default-width $border-color-dark;
  border-radius: $radius-lg;
  font-size: $font-size-lg;
  text-align: center;
  cursor: pointer;
  transition: $transition-border;
  position: relative;

  &:not(.working):hover {
    border-color: $color-theme;
  }

  .browse-hint {
    margin-left: $spacer-xxs;
    font-weight: 500;
  }

  .working-flag {
    display: block;
    background-color: $color-white;
    font-size: $font-size-h3;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    transition: $transition-opacity;
  }

  &.working {
    cursor: not-allowed;

    .working-flag {
      visibility: visible;
      opacity: .9;
    }
  }
}
</style>
