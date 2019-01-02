<template>
  <div class="excel-importer">
    <input ref="excelImportInput" class="excel-import-input" type="file" accept=".xlsx, .xls" @change="onInputFile" />
    <a
      v-if="enableDragDrop" :class="{ 'disabled': working }" class="file-drop-box"
      @click="!working && $refs['excelImportInput'].click()"
      @drop.prevent.stop="!working && handleDrop($event)"
      @dragover.prevent.stop="onDragOver"
      @dragenter.prevent.stop="onDragOver"
    >
      <div class="text-muted"><va-icon icon="action-import" /></div>
      <template v-if="file">
        <span class="text-muted">{{ $t('excelImport.selected') }} "{{ file.name }}"</span>
        <span class="text-primary browse-hint">
          {{ $t('excelImport.change') }}
        </span>
      </template>
      <template v-else>
        <span class="text-muted">{{ $t('excelImport.drag') }}</span>
        <span class="text-primary browse-hint">
          {{ $t('excelImport.browse') }}
        </span>
      </template>
      <span class="working-flag">
        <i class="el-icon-loading"></i>
      </span>
    </a>
    <div v-else class="text-center">
      <el-button :loading="working" plain @click="!working && $refs['excelImportInput'].click()">
        <template v-if="file">
          {{ $t('excelImport.selected') }}: "{{ file.name }}", {{ $t('excelImport.change') }}.
        </template>
        <template v-else>
          {{ $t('excelImport.browseNotDrag') }}
        </template>
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    // Allow import by drag and drop one file
    enableDragDrop: { type: Boolean, default: false },
    beforeImport: { type: Function, default: null },
    onSuccess: { type: Function, default: null }
  },
  data() {
    return {
      working: false,
      file: null,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      const R = range.s.r
      let C
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    fixData(data) {
      const w = 10240
      let o = ''
      let l = 0
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    readerData(rawFile) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target['result']
          const fixedData = this.fixData(data)
          const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          setTimeout(() => {
            this.working = false
          }, 400)
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    import(rawFile) {
      this.working = true
      this.file = rawFile
      this.$refs['excelImportInput'].value = null // fix can't select the same excel

      if (!this.beforeImport) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeImport(rawFile)
      if (!before) this.working = false
      before && this.readerData(rawFile)
    },
    onDragOver(e) {
      e.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(e) {
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error(this.$t('excelImport.errorExcess'))
        return
      }

      const file = files[0]
      if (!this.isExcel(file)) {
        this.$message.error(this.$t('excelImport.errorTypes'))
        return
      }

      this.import(file)
    },
    onInputFile(e) {
      const file = e.target.files[0]
      file && this.import(file)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

$file-drop-width:   100%;
$file-drop-height:  90px;

.excel-import-input {
  display: none;
}

.file-drop-box {
  width: $file-drop-width;
  height: $file-drop-height;
  padding: $spacer-base;
  font-size: $font-size-lg;

  .va-icon {
    width: $font-size-h2;
    height: $font-size-h2;
    margin-bottom: $spacer-xs;
  }

  .browse-hint {
    margin-left: $spacer-xxs;
    font-weight: 500;
  }

  .working-flag {
    display: block;
    background-color: $color-white;
    line-height: $file-drop-height;
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

  &.disabled .working-flag {
    visibility: visible;
    opacity: .9;
  }
}
</style>
