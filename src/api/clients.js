/**
 * client (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/27 12:15
 */

import { service } from './request'

/**
 * Returns the client list.
 * @param current - Current page number
 * @param limit   - The number of list limit in every page
 * @param keyword - Keyword search
 */
export function clientList(current, limit, keyword) {
  const data = { current, limit, keyword }
  return service({
    method: 'post', url: '/clients/list', data
  }).then(res => res.data)
}
