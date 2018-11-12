export function articleStatus(status) {
  const statusMap = {
    draft: 'info',
    committed: 'warning',
    failing: 'danger',
    auditing: 'primary',
    audited: 'success',
    deleted: 'info'
  }
  return statusMap[status]
}

export function articlePV(pv) {
  return pv > 20000 ? '2w+' : pv > 9999 ? '9999+' : pv
}
