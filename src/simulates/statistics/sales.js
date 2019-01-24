// import Dictionaries from '@/simulates/dictionaries'

function generateProduct() {
  return 0
}

function generatePrice() {
  return 0
}

export function generateSales(date) {
  const sales = +(Math.random() * 500000 + 2000000).toFixed(2)
  const vol = Math.floor(Math.random() * 2000 + 400)
  const product = generateProduct()
  const price = generatePrice()

  return { date, sales, vol, product, price }
}
