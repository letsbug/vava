/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 16:00
 */

export function paramToObj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
