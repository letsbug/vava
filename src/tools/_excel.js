import XLSX from 'xlsx'
import('script-loader!file-saver')

const exportExlByTable = () => {}

const exportExlByJson = ({
  header,
  data,
  filename = 'unnamed',
  autoWidth = true,
  type = 'xlsx'
}) => {
  data = [...data]
  data.unshift(header)
}

export default {
  exportExlByTable, exportExlByJson
}
