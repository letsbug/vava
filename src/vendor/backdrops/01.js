'use strict'

// firefly-3d

let w = window.innerWidth
let h = window.innerHeight
const num = 200
const _x = 0
const _y = 0
const _z = 150
const dtr = function(d) {
  return d * Math.PI / 180
}

const rnd = function() {
  return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180)
}

const cam = {
  obj: { x: _x, y: _y, z: _z },
  dest: { x: 0, y: 0, z: 1 },
  dist: { x: 0, y: 0, z: 200 },
  ang: { cplane: 0, splane: 0, ctheta: 0, stheta: 0 },
  zoom: 1,
  disp: { x: w / 2, y: h / 2, z: 0 },
  upd: function() {
    cam.dist.x = cam.dest.x - cam.obj.x
    cam.dist.y = cam.dest.y - cam.obj.y
    cam.dist.z = cam.dest.z - cam.obj.z
    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
      Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
  }
}

const trans = {
  parts: {
    sz: function(p, sz) {
      return {
        x: p.x * sz.x,
        y: p.y * sz.y,
        z: p.z * sz.z
      }
    },
    rot: {
      x: function(p, rot) {
        return {
          x: p.x,
          y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
          z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
        }
      },
      y: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
          y: p.y,
          z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
        }
      },
      z: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
          y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
          z: p.z
        }
      }
    },
    pos: function(p, pos) {
      return {
        x: p.x + pos.x,
        y: p.y + pos.y,
        z: p.z + pos.z
      }
    }
  },
  pov: {
    plane: function(p) {
      return {
        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
        y: p.y,
        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
      }
    },
    theta: function(p) {
      return {
        x: p.x,
        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
      }
    },
    set: function(p) {
      return {
        x: p.x - cam.obj.x,
        y: p.y - cam.obj.y,
        z: p.z - cam.obj.z
      }
    }
  },
  persp: function(p) {
    return {
      x: p.x * cam.dist.z / p.z * cam.zoom,
      y: p.y * cam.dist.z / p.z * cam.zoom,
      z: p.z * cam.zoom,
      p: cam.dist.z / p.z
    }
  },
  disp: function(p, disp) {
    return {
      x: p.x + disp.x,
      y: -p.y + disp.y,
      z: p.z + disp.z,
      p: p.p
    }
  },
  steps: function(_obj_, sz, rot, pos, disp) {
    let _args = trans.parts.sz(_obj_, sz)
    _args = trans.parts.rot.x(_args, rot)
    _args = trans.parts.rot.y(_args, rot)
    _args = trans.parts.rot.z(_args, rot)
    _args = trans.parts.pos(_args, pos)
    _args = trans.pov.plane(_args)
    _args = trans.pov.theta(_args)
    _args = trans.pov.set(_args)
    _args = trans.persp(_args)
    _args = trans.disp(_args, disp)
    return _args
  }
}

const ThreeD = function(param) {
  this.transIn = {}
  this.transOut = {}
  this.transIn.vtx = (param.vtx)
  this.transIn.sz = (param.sz)
  this.transIn.rot = (param.rot)
  this.transIn.pos = (param.pos)
}

ThreeD.prototype.vupd = function() {
  this.transOut = trans.steps(
    this.transIn.vtx,
    this.transIn.sz,
    this.transIn.rot,
    this.transIn.pos,
    cam.disp
  )
}

class Build {
  constructor() {
    this.vel = 0.04
    this.lim = 360
    this.diff = 200
    this.toX = _x
    this.toY = _y
    this.go()
  }

  go() {
    this.canvas = document.getElementById('appBackDrop')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.$ = this.canvas.getContext('2d')
    this.$.globalCompositeOperation = 'source-over'
    this.varr = []
    this.calc = []

    for (let i = 0, len = num; i < len; i++) {
      this.add()
    }

    this.rotObj = { x: 0, y: 0, z: 0 }
    this.objSz = { x: w / 5, y: h / 5, z: w / 5 }
  }

  add() {
    this.varr.push(new ThreeD({
      vtx: { x: rnd(), y: rnd(), z: rnd() },
      sz: { x: 0, y: 0, z: 0 },
      rot: { x: 20, y: -20, z: 0 },
      pos: {
        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
      }
    }))
    this.calc.push({
      x: 360 * Math.random(),
      y: 360 * Math.random(),
      z: 360 * Math.random()
    })
  }

  upd() {
    cam.obj.x += (this.toX - cam.obj.x) * 0.05
    cam.obj.y += (this.toY - cam.obj.y) * 0.05
  }

  draw() {
    this.$.clearRect(0, 0, this.canvas.width, this.canvas.height)
    cam.upd()
    this.rotObj.x += 0.1
    this.rotObj.y += 0.1
    this.rotObj.z += 0.1

    for (let i = 0; i < this.varr.length; i++) {
      for (const val in this.calc[i]) {
        if (this.calc[i].hasOwnProperty(val)) {
          this.calc[i][val] += this.vel
          if (this.calc[i][val] > this.lim) this.calc[i][val] = 0
        }
      }

      this.varr[i].transIn.pos = {
        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
      }
      this.varr[i].transIn.rot = this.rotObj
      this.varr[i].transIn.sz = this.objSz
      this.varr[i].vupd()
      if (this.varr[i].transOut.p < 0) continue
      const g = this.$.createRadialGradient(
        this.varr[i].transOut.x,
        this.varr[i].transOut.y,
        this.varr[i].transOut.p,
        this.varr[i].transOut.x,
        this.varr[i].transOut.y,
        this.varr[i].transOut.p * 2
      )
      this.$.globalCompositeOperation = 'lighter'
      g.addColorStop(0, 'hsla(255, 255%, 255%, 1)')
      g.addColorStop(0.5, 'hsla(' + (i + 2) + ',85%, 40%,1)')
      g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)')
      this.$.fillStyle = g
      this.$.beginPath()
      this.$.arc(
        this.varr[i].transOut.x,
        this.varr[i].transOut.y,
        this.varr[i].transOut.p * 2,
        0,
        Math.PI * 2,
        false
      )
      this.$.fill()
      this.$.closePath()
    }
  }

  anim() {
    const _this = this
    window.requestAnimationFrame = window.requestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    const anim = function() {
      _this.upd()
      _this.draw()
      window.requestAnimationFrame(anim)
    }
    window.requestAnimationFrame(anim)
  }

  run() {
    const _this = this
    _this.anim()
    window.addEventListener('mousemove', function(e) {
      _this.toX = (e.clientX - _this.canvas.width / 2) * -0.8
      _this.toY = (e.clientY - _this.canvas.height / 2) * 0.8
    })
    window.addEventListener('touchmove', function(e) {
      e.preventDefault()
      _this.toX = (e.touches[0].clientX - _this.canvas.width / 2) * -0.8
      _this.toY = (e.touches[0].clientY - _this.canvas.height / 2) * 0.8
    }, { passive: true })
    window.addEventListener('resize', function(e) {
      e.preventDefault()
      _this.canvas.width = w = window.innerWidth
      _this.canvas.height = h = window.innerHeight
    })
  }
}

new Build().run()
