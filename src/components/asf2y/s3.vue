<template>
  <div class="s1">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      W: window.innerWidth,
      Y: window.innerHeight,
      rAf: null,
      mouse: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      config: {
        nPoints: 20,
        nLines: 20,
        radius: 100,
        padding: 40,
        showFPS: false,
        showPoints: false,
        maxSpeed: 30
      },
      pointsPerLine: 20,
      linesInScreen: 20,
      lines: [],
      homesX: [],
      homesY: [],
      padding: 40,
      max: 30,
      radius: 200,
      fpsObj: (onSecond => {
        let lastSec = Date.now()
        let frames = 0
        let fps = 0
        return {
          onFrame: () => {
            if ((Date.now() - lastSec) / 1000 > 1) {
              lastSec = Date.now()
              fps = frames
              frames = 0
              if (onSecond) onSecond(fps)
            } else {
              frames += 1
            }
          },
          getFPS: () => {
            return fps
          }
        }
      })(),
      debug: {
        fps: false,
        dots: false
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.utilsCanvasInit()
    this.init()

    window.addEventListener('resize', () => {
      this.init()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.init)
  },
  methods: {
    utilsCanvasInit() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.ctx = this.canvas.getContext('2d')
      // this.ctx.strokeStyle = this.strokeColor
      // this.ctx.lineWidth = this.strokeWidth
    },
    onMove(e) {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    },
    mid(...args) {
      if (args.length < 3) return args[0] || 0
      const sorted = args.slice().sort((a, b) => a - b)
      return sorted[Math.round((sorted.length - 1) / 2)]
    },
    PY(x, y) {
      Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2))
    },
    // updateLine(line, homeX) {
    //   console.log('update')
    //   let point,
    //     desiredX,
    //     desiredY,
    //     desiredH,
    //     desiredForce,
    //     desiredAngle,
    //     hvx,
    //     hvy,
    //     mvx,
    //     mvy,
    //     x,
    //     y,
    //     homeY,
    //     vx,
    //     vy
    //   let radius = this.config.radius
    //   let maxSpeed = this.config.maxSpeed
    //   for (var j = line.length - 1; j >= 0; j--) {
    //     point = line[j]
    //     x = point.x
    //     y = point.y
    //     ;(hvx = 0), (hvy = 0)
    //     // Home forces
    //     homeY = this.homesY[j]
    //     if (x !== homeX || y !== homeY) {
    //       desiredX = homeX - x
    //       desiredY = homeY - y
    //       desiredH = this.PY(desiredX, desiredY)
    //       desiredForce = Math.max(desiredH * 0.2, 1)
    //       desiredAngle = Math.atan2(desiredY, desiredX)
    //       hvx = desiredForce * Math.cos(desiredAngle)
    //       hvy = desiredForce * Math.sin(desiredAngle)
    //     }
    //     // Mouse Forces
    //     ;(mvx = 0), (mvy = 0)
    //     desiredX = x - this.mouse.x
    //     desiredY = y - this.mouse.y
    //     if (
    //       !(
    //         desiredX > radius ||
    //         desiredY > radius ||
    //         desiredY < -radius ||
    //         desiredX < -radius
    //       )
    //     ) {
    //       desiredAngle = Math.atan2(desiredY, desiredX)
    //       desiredH = this.PY(desiredX, desiredY)
    //       desiredForce = Math.max(0, Math.min(radius - desiredH, radius))
    //       mvx = desiredForce * Math.cos(desiredAngle)
    //       mvy = desiredForce * Math.sin(desiredAngle)
    //     }
    //     // Combine and limit
    //     vx = Math.round(this.mid((mvx + hvx) * 0.9, maxSpeed, -maxSpeed))
    //     vy = Math.round(this.mid((mvy + hvy) * 0.9, maxSpeed, -maxSpeed))

    //     // Dont let point get too far from home

    //     if (vx != 0) {
    //       point.x += vx
    //     }
    //     if (vy != 0) {
    //       point.y += vy
    //     }
    //     line[j] = point
    //   }

    //   return line
    // },
    // timer() {
    //   const ctx = this.ctx
    //   const lines = this.lines
    //   ctx.clearRect(0, 0, this.W, this.H)
    //   if (this.config.showFPS) {
    //     this.fpsObj.onFrame()
    //     ctx.fillStyle = '#282828'
    //     ctx.textAlign = 'start'
    //     ctx.textBaseline = 'top'
    //     ctx.font = '50px Helvetica'
    //     ctx.fillText(this.fpsObj.getFPS(), 50, 50)
    //   }
    //   let line, xc, yc, cur, curX, curY, next, dot
    //   for (var i = lines.length - 1; i >= 0; i--) {
    //     // Update before rendering
    //     line = this.updateLine(lines[i], this.homesX[i])
    //     lines[i] = line
    //     ctx.beginPath()
    //     ctx.strokeStyle = '#d2d2d2'
    //     ctx.moveTo(line[line.length - 1].x, line[line.length - 1].y)
    //     for (var j = line.length - 2; j > 1; j--) {
    //       cur = line[j]
    //       curX = cur.x
    //       curY = cur.y
    //       next = line[j - 1]
    //       xc = (curX + next.x) / 2
    //       yc = (curY + next.y) / 2
    //       ctx.quadraticCurveTo(curX, curY, xc, yc)
    //     }
    //     ctx.quadraticCurveTo(line[j].x, line[j].y, line[j - 1].x, line[j - 1].y)
    //     ctx.stroke()
    //     if (this.config.showPoints) {
    //       for (j = line.length - 1; j >= 0; j--) {
    //         dot = line[j]
    //         ctx.beginPath()
    //         ctx.fillStyle = 'red'
    //         ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI)
    //         ctx.fill()
    //       }
    //     }
    //   }
    //   this.rAF = requestAnimationFrame(this.timer)
    // },
    point(x, y) {
      return {
        x: x,
        y: y,
        hy: y,
        hx: x
      }
    },
    updateX() {
      let calcPad,
        rAF = this.rAF

      if (rAF) {
        cancelAnimationFrame(rAF)
        rAF = null
      }
      calcPad = (this.W * this.config.padding) / 100
      this.homesX = []
      for (var i = this.config.nLines; i >= 0; i--) {
        this.x = calcPad + ((this.W - calcPad * 2) / this.config.nLines) * i
        this.homesX.push(this.x)
      }
      this.timer()
    },
    init() {
      console.log(3333)
      let rAF = this.rAF
      if (rAF) {
        cancelAnimationFrame(rAF)
        rAF = null
      }
      this.lines = []
      this.homesX = []
      this.homesY = []
      let line = [],
        x = 0
      let calcPad = (this.W * this.config.padding) / 100
      for (var i = this.config.nLines; i >= 0; i--) {
        line = []
        x = calcPad + ((this.W - calcPad * 2) / this.config.nLines) * i
        this.homesX.push(x)
        for (var j = this.config.nPoints; j >= 0; j--) {
          line.push(
            this.point(x, Math.round((this.H / this.config.nPoints) * j))
          )
          if (i === 0) {
            this.homesY.push(Math.round((this.H / this.config.nPoints) * j))
          }
        }
        this.lines.push(line)
      }
      console.log(this.lines)
      // this.timer()
      ;(() => {
        const ctx = this.ctx
        const lines = this.lines
        ctx.clearRect(0, 0, this.W, this.H)
        if (this.config.showFPS) {
          this.fpsObj.onFrame()
          ctx.fillStyle = '#282828'
          ctx.textAlign = 'start'
          ctx.textBaseline = 'top'
          ctx.font = '50px Helvetica'
          ctx.fillText(this.fpsObj.getFPS(), 50, 50)
        }
        let dot
        for (var i = lines.length - 1; i >= 0; i--) {
          // Update before rendering
          // line = this.updateLine(lines[i], this.homesX[i])
          // lines[i] = line
          ctx.beginPath()
          ctx.strokeStyle = '#d2d2d2'
          // ctx.moveTo(line[line.length - 1].x, line[line.length - 1].y)
          // for (var j = line.length - 2; j > 1; j--) {
          //   cur = line[j]
          //   curX = cur.x
          //   curY = cur.y
          //   next = line[j - 1]
          //   xc = (curX + next.x) / 2
          //   yc = (curY + next.y) / 2
          //   ctx.quadraticCurveTo(curX, curY, xc, yc)
          // }
          // ctx.quadraticCurveTo(
          //   line[j].x,
          //   line[j].y,
          //   line[j - 1].x,
          //   line[j - 1].y
          // )
          ctx.stroke()
          if (this.config.showPoints) {
            for (j = line.length - 1; j >= 0; j--) {
              dot = line[j]
              ctx.beginPath()
              ctx.fillStyle = 'red'
              ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI)
              ctx.fill()
            }
          }
        }
      })()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.s1 {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.title {
  text-align: left;
  position: absolute;
  left: 0;
  font-size: 10rem;
  /* animation-name: oxxo; */
  animation-duration: 10s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes oxxo {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}
</style>
