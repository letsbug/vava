/* eslint-disable */
import XLSX from 'xlsx'
require('script-loader!file-saver')

class Workbook {
  constructor() {
    this.SheetNames = []
    this.Sheets = {}
  }
}

const datenum = (v, date1904) => {
  if (date1904) v += 1462
  const epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

const sheet_from_array_of_arrays = data => {
  const ws = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      const cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

export const handleExport = ({
  header,
  data,
  filename = 'unnamed',
  autoWidth = true,
  type = 'xlsx'
}) => {
  data = [...data]
  data.unshift(header)
  const ws_name = 'SheetJS',
    wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data)

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      return !val
        ? { 'wch': 10 }
        : val.toString().charCodeAt(0) > 255 /* 中文 */
          ? { 'wch': val.toString().length * 2 }
          : { 'wch': val.toString().length }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws

  const wbout = XLSX.write(wb, {
    bookType: type,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${filename}.${type}`)
}
