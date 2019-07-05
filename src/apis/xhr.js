/**
 * XMLHttpRequest
 * @param url
 * @param async
 * @returns {Promise<any>}
 */
export function xhr(url, async = true) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.onreadystatechange = () => {
      if (client.readyState !== 4) return

      if (client.status === 200) {
        const urlArr = client.responseURL.split('/')
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        })
      } else reject(new Error(client.statusText))
    }
    client.open('GET', url, async)
    client.send()
  })
}
