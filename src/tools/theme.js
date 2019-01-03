// import Cookie from 'js-cookie'

function getFile(url, isBlob = false) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.responseType = isBlob ? 'blob' : ''
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/')
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        })
      } else {
        reject(new Error(client.statusText))
      }
    }
    client.open('GET', url)
    client.send()
  })
}

function getTemplate(data) {
  const colorMap = {
    '#24963e': 'shade-1',
    '#28a745': 'primary',
    '#3db058': 'light-1',
    '#53b96a': 'light-2',
    '#69c17d': 'light-3',
    '#7eca8f': 'light-4',
    '#94d3a2': 'light-5',
    '#a9dcb5': 'light-6',
    '#bfe5c7': 'light-7',
    '#d4edda': 'light-8',
    '#eaf6ec': 'light-9'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

class Theme {
  constructor() {
    getFile('./static/css/theme-template.css').then(({ data }) => {
      this.template = getTemplate(data)
    })
  }
}

export default Theme
