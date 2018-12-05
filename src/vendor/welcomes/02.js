'use strict'

// firefly-joint

const canvas = document.getElementById('appBackDrop')

const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.lineWidth = 0.3
ctx.strokeStyle = (new Color(150)).style

const mousePosition = {
  x: 30 * canvas.width / 100,
  y: 30 * canvas.height / 100
}

const dots = {
  nb: 300,
  distance: 50,
  d_radius: 100,
  array: []
}

function colorValue(min) {
  return Math.floor(Math.random() * 255 + min)
}

function createColorStyle(r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
}

function mixComponents(comp1, weight1, comp2, weight2) {
  return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
}

function averageColorStyles(dot1, dot2) {
  const color1 = dot1.color
  const color2 = dot2.color

  const r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
  const g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
  const b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
  return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
}

function Color(min) {
  min = min || 0
  this.r = colorValue(min)
  this.g = colorValue(min)
  this.b = colorValue(min)
  this.style = createColorStyle(this.r, this.g, this.b)
}

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = -0.5 + Math.random()
    this.vy = -0.5 + Math.random()

    this.radius = Math.random() * 2
    this.color = new Color()
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color.style
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
  }
}

function createDots() {
  for (let i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot())
  }
}

function moveDots() {
  for (let i = 0; i < dots.nb; i++) {
    const dot = dots.array[i]

    if (dot.y < 0 || dot.y > canvas.height) {
      dot.vy = -dot.vy
    } else if (dot.x < 0 || dot.x > canvas.width) {
      dot.vx = -dot.vx
    }

    dot.x += dot.vx
    dot.y += dot.vy
  }
}

function connectDots() {
  for (let i = 0; i < dots.nb; i++) {
    for (let j = 0; j < dots.nb; j++) {
      const i_dot = dots.array[i]
      const j_dot = dots.array[j]

      const inDotsDistance = (i_dot.x - j_dot.x) < dots.distance &&
        (i_dot.y - j_dot.y) < dots.distance &&
        (i_dot.x - j_dot.x) > -dots.distance &&
        (i_dot.y - j_dot.y) > -dots.distance

      const dotsInMouseRadius = (i_dot.x - mousePosition.x) < dots.d_radius &&
        (i_dot.y - mousePosition.y) < dots.d_radius &&
        (i_dot.x - mousePosition.x) > -dots.d_radius &&
        (i_dot.y - mousePosition.y) > -dots.d_radius

      if (inDotsDistance && dotsInMouseRadius) {
        ctx.beginPath()
        ctx.strokeStyle = averageColorStyles(i_dot, j_dot)
        ctx.moveTo(i_dot.x, i_dot.y)
        ctx.lineTo(j_dot.x, j_dot.y)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }
}

function drawDots() {
  for (let i = 0; i < dots.nb; i++) {
    dots.array[i].draw()
  }
}

function animateDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  moveDots()
  connectDots()
  drawDots()

  requestAnimationFrame(animateDots)
}

window.addEventListener('mousemove', function(e) {
  mousePosition.x = e.pageX
  mousePosition.y = e.pageY
})

window.addEventListener('mouseleave', function() {
  mousePosition.x = canvas.width / 2
  mousePosition.y = canvas.height / 2
})

createDots()
requestAnimationFrame(animateDots)
