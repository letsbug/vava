/**
 * StatusFilter (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/27 14:24
 */

/**
 *
 * Returns the corresponding status style according to the status code
 * @param status - Status code
 * @returns {string}
 */
const statusTransStyle = status => {
  const statusStyle = ['info', 'warning', 'success', 'danger']
  return statusStyle[status]
}

/**
 * Returns the corresponding status name according to the status code
 * @param status - Status code
 * @returns {*}
 */
const statusTransName = status => {
  const statusNames = ['creat', 'audit', 'published', 'defeat']
  return statusNames[status]
}

/**
 * Returns the full name after the merged
 * @param name
 * @returns {*}
 */
const mergeName = name => {
  return name.first + name.last
}

/**
 * Returns the full address after the merge
 * @param addr
 * @returns {*}
 */
const mergeAddress = addr => {
  return addr.city + 'xxxx乡镇xxxx小区xxxx号xxxx栋xxxx号'
}

export { statusTransStyle, statusTransName, mergeName, mergeAddress }
