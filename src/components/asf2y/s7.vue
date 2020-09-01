<template>
  <div class="s7" ref="s7">
    <Stars class="starsWrap"></Stars>
    <Haiji
      :haijiInView="haijiInView"
      :haijiHeight="haijiHeight"
      :styles="{ top: haijiTop + 'px', zIndex: haijiZIndex }"
      class="haijiClassS7"
      :end="end"
    ></Haiji>
    <div id="fishWrap"></div>
  </div>
</template>

<script>
import Haiji from './Haiji.vue'
import Stars from './Stars.vue'

export default {
  name: 'S7',
  components: { Haiji, Stars },
  mounted() {
    this.haijiTop = -window.innerHeight - 300
    this.maxHeight = window.innerHeight + 800
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    this.handleLoadImage()
    this.handleEntry()
    this.intervalId = setInterval(() => {
      this.clearEntry()
      setTimeout(this.handleEntry, this.timing)
    }, (this.depth + 1) * this.timing)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    clearInterval(this.intervalId)
  },
  data: function() {
    return {
      haijiInView: false,
      haijiHeight: 0,
      end: false,
      haijiTop: 0,
      haijiZIndex: 0,
      maxHeight: 0,
      depth: 5,
      timing: 700
    }
  },
  methods: {
    handleScroll: function() {
      const { top } = this.$refs.s7.getBoundingClientRect()

      if (top < window.innerHeight) {
        const ratio =
          Math.round(((window.innerHeight - top) / window.innerHeight) * 100) /
          100
        this.haijiZIndex = 3
        this.haijiInView = true
        const height = window.innerHeight + ratio * window.innerHeight
        if (height < this.maxHeight) {
          this.haijiHeight = height
        } else {
          this.haijiHeight = this.maxHeight
        }
      } else {
        this.haijiInView = false
        this.haijiZIndex = 0
      }
      this.haijiInView = !(top < 10)
      this.end = this.haijiHeight >= this.maxHeight - 300
    },
    handleLoadImage: function() {
      const container = document.getElementById('fishWrap')
      const image = new Image()
      image.src = require('@/assets/fish.jpg')
      for (var i = 0; i < this.depth * 2; i++) {
        const img = image.cloneNode()
        const idx = Math.floor(i / 2)
        img.className += `fish fish${idx}${i % 2 === 0 ? '' : ' animation'}`
        container.appendChild(img)
      }
    },
    handleEntry: function() {
      const timeout = i => {
        return () => {
          const els = document.getElementsByClassName(`fish${i}`)
          if (els) {
            if (i === 0) {
              if (els[1]) els[1].style.display = 'block'
            } else {
              if (els[0]) els[0].style.display = 'block'
              if (els[1]) els[1].style.display = 'block'
            }
          }
        }
      }
      for (let i = 0; i <= this.depth; i++) {
        setTimeout(timeout(i), this.timing * i)
      }
    },
    clearEntry: function() {
      const clear = i => {
        const els = document.getElementsByClassName(`fish${i}`)
        if (els) {
          if (i === 0) {
            if (els[1]) els[1].style.display = 'none'
          } else {
            if (els[0]) els[0].style.display = 'none'
            if (els[1]) els[1].style.display = 'none'
          }
        }
      }
      for (let i = 0; i <= this.depth; i++) {
        clear(i)
      }
    }
  }
}
</script>

<style lang="sass">
@import '../../utils/global.sass'

$scale1: 80%
$scale2: 60%
$scale3: 40%
$scale4: 20%
$scale5: 10%
$scale6: 30%
$timing: .7s

.s7
  position: relative
  &:before
    content: attr(data-text)
    display: block
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(90deg,rgba(255, 0, 0, 0.06),rgba(0, 255, 0, 0.02),rgba(0, 0, 255, 0.06))
    background-size: 100% 2px, 3px 100%
    pointer-events: none
    color: transparent
  &:after
    content: attr(data-content)
    display: block
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(18, 16, 16, 0.1)
    opacity: 0
    pointer-events: none
    animation: flicker 0.15s infinite
    color: transparent

.starsWrap
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  z-index: 4
  transform: rotate(45deg)

.fish
  position: absolute
  right: 0
  bottom: 0

.fish0
  object-fit: cover
  height: 100%
  width: 100%
  &.animation
    animation: shrink0 $timing ease-out

.fish1
  object-fit: cover
  height: $scale1
  width: $scale1
  display: none
  &.animation
    animation: shrink1 $timing ease-out

.fish2
  object-fit: cover
  height: $scale2
  width: $scale2
  display: none
  &.animation
    animation: shrink2 $timing ease-out
.fish3
  object-fit: cover
  height: $scale3
  width: $scale3
  display: none
  &.animation
    animation: shrink3 $timing ease-out

.fish4
  object-fit: cover
  height: $scale4
  width: $scale4
  display: none
  &.animation
    animation: shrink4 $timing ease-out

// .fish5
//   object-fit: cover
//   height: $scale5
//   width: $scale5
//   display: none
//   &.animation
//     animation: shrink5 $timing ease-out

// .fish6
//   object-fit: cover
//   height: $scale6
//   width: $scale6
//   display: none

@keyframes shrink0
  to
    height: $scale1
    width: $scale1

@keyframes shrink1
  to
    height: $scale2
    width: $scale2

@keyframes shrink2
  to
    height: $scale3
    width: $scale3

@keyframes shrink3
  to
    height: $scale4
    width: $scale4

@keyframes shrink4
  to
    height: $scale5
    width: $scale5

@keyframes shrink5
  to
    height: $scale6
    width: $scale6
</style>
