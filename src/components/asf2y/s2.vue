<template>
  <div class="s2" ref="s2">
    <canvas id="s2Canvas" ref="canvas"></canvas>
    <img
      class="notifWrap"
      src="../../assets/amendment.png"
      v-show="notifInView"
    />
    <transition v-on:enter="enter" v-on:leave="leave">
      <div class="block" v-show="blockInView">
        <vue-typed-js
          :strings="[`舒斯牠錯著ㄓㄨ\n錯著ㄓㄨ舒斯牠`, '舒斯牠錯著ㄓㄨ']"
          :loop="true"
          :typeSpeed="130"
          :showCursor="false"
          :backSpeed="20"
        >
          <span class="typing"></span>
        </vue-typed-js>
      </div>
    </transition>
    <div class="imageMarqueeWarp">
      <ImageMarquee
        :content="['line', 'line2']"
        classname="marqueeImg"
        :imgStyle="{ height: '100%', width: '50vw' }"
      >
      </ImageMarquee>
    </div>
    <div class="convoWrap">
      <Notification
        name="dinner"
        v-if="convoInView"
        :progress="[0, 100, 200, 270, 340, 450, 570, 650, 730]"
        :timing="1000"
      >
      </Notification>
    </div>
  </div>
</template>

<script lang="ts">
import Velocity from 'velocity-animate'
import ImageMarquee from './ImageMarquee.vue'
import Notification from './Notification.vue'

export default {
  name: 'S2',
  components: {
    ImageMarquee,
    Notification
  },
  data: function() {
    return {
      convoInView: false,
      notifInView: false,
      inView: false,
      blockInView: false,
      ctx: null,
      timing: 300
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.intervalId = setInterval(() => {
      this.notifInView = true
      setTimeout(() => (this.notifInView = false), 100)
      setTimeout(() => (this.notifInView = true), 200)
      setTimeout(() => (this.notifInView = false), 300)
    }, 5000)

    const canvas = document.getElementById('s2Canvas')
    window.addEventListener('resize', this.resize(canvas))
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight / 2
    const ctx = canvas.getContext('2d')
    this.ctx = ctx
    this.initPath(ctx)
    const top = this.$refs.s2.getBoundingClientRect().top
    if (top < window.innerHeight && top > -window.innerHeight) {
      this.inView = true
    }
    if (top < window.innerHeight / 2 && top > 0) {
      this.blockInView = true
    }

    if (top < window.innerHeight / 2 && top > -window.innerHeight) {
      this.convoInView = true
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    this.closePath()
    clearInterval(this.intervalId)
  },
  watch: {
    inView: function() {
      this.inView && window.requestAnimationFrame(this.draw)
    }
  },
  methods: {
    handleScroll() {
      const top = this.$refs.s2.getBoundingClientRect().top
      if (top < window.innerHeight / 2 && top > 0) {
        this.blockInView = true
      } else {
        this.blockInView = false
      }
      if (top < window.innerHeight / 2 && top > -window.innerHeight) {
        this.convoInView = true
      } else {
        this.convoInView = false
      }
    },
    enter: function(el) {
      Velocity(el, 'fadeIn', { duration: 300 })
    },
    leave: function(el) {
      Velocity(el, 'fadeOut', { duration: 300 })
    },
    draw: function() {
      if (this.ctx && this.inView) {
        let numW =
          Math.floor(Math.random() * window.innerWidth) *
            Math.round(Math.random() * 2 - 1) +
          pX
        let numH =
          Math.floor((Math.random() * window.innerHeight) / 2) *
            Math.round(Math.random() * 2 - 1) +
          pY
        if (pX < 0 || pX > window.innerWidth) {
          numW = -numW
        }
        if (pY < 0 || pY > window.innerHeight / 2) {
          numH = -numH
        }
        pX += numW
        pY += numH
        this.ctx.lineTo(pX, pY)
        this.ctx.stroke()
        window.requestAnimationFrame(this.draw)
      }
    },
    initPath: function(ctx) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, 0)
    },
    closePath: function() {
      if (this.ctx) {
        this.inView = false
        this.ctx.closePath()
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    },
    resize: function(canvas) {
      return () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight / 2
      }
    }
  }
}
let pX = 0
let pY = 0
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'

.s2
  position: relative

.notifWrap
  position: fixed
  left: 50%
  top: 50%
  transform: translateX(-50%) translateY(-50%)
  z-index: 3

.block
  height: 500px
  width: 300px
  background: #000000
  margin: 0 auto
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%) translateY(-30%)
  z-index: 2
  color: #ffffff
  font-size: 3rem
  padding: 2rem
  .typing
    white-space: pre-wrap
    writing-mode: vertical-rl
    text-orientation: upright
    font-family: $fontFamily
    font-weight: 900
    text-align: start
    margin-right: 0
    margin-left: auto

@media (max-width: $md)
  .block
    width: 50vw
    min-width: 200px
  .notifWrap
    width: 90vw

.imageMarqueeWarp
  transform: translateY(-2px)
.marqueeImg
  height: 50vh

.convoWrap
  position: fixed
  left: 50%
  top: 50%
  transform: translateX(-50%) translateY(-50%)
  z-index: 2
</style>
