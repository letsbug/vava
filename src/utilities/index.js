/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 16:00
 */

/**
 * Parse the parameter column from the url link
 * @param url
 * @returns {{}}
 */
export function paramToObj(url) {
  const search = url.split('?')[1]
  return search ? JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    : {}
}
