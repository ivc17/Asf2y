<template>
  <div class="s7" ref="s7">
    <Haiji
      :haijiInView="haijiInView"
      :haijiHeight="haijiHeight"
      :styles="{ top: haijiTop + 'px', zIndex: haijiZIndex }"
      class="haijiClassS7"
      :end="end"
    ></Haiji>
    <div id="fishWrap"></div>
    <div></div>
  </div>
</template>

<script>
import Haiji from './Haiji.vue'
export default {
  name: 'S7',
  components: { Haiji },
  mounted() {
    this.haijiTop = -window.innerHeight - 300
    this.maxHeight = window.innerHeight + 600
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    this.handleLoadImage()
    this.handleEntry()
    this.intervalId = setInterval(() => {
      this.clearEntry()
      setTimeout(this.handleEntry, 500)
    }, (this.depth + 1) * 500)
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
      depth: 6
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
      this.haijiInView = !(top < window.innerHeight / 3)
      this.end = this.haijiHeight === this.maxHeight
    },
    handleLoadImage: function() {
      const container = document.getElementById('fishWrap')
      const image = new Image()
      image.src = require('@/assets/fish.png')
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
            if (i === 0 || i === this.depth - 1) {
              if (els[1]) els[1].style.display = 'block'
            } else {
              if (els[0]) els[0].style.display = 'block'
              if (els[1]) els[1].style.display = 'block'
            }
          }
        }
      }
      for (let i = 0; i <= this.depth; i++) {
        setTimeout(timeout(i), 500 * i)
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
$scale2: 70%
$scale3: 60%
$scale4: 50%
$scale5: 40%
$scale6: 30%

.s7
  position: relative

#fishWrap
  position: relative
  height: 100%
  width: 100%

  .fish
    position: absolute
    left: 50%
    top: 50%
    transform: translateX(-50%) translateY(-50%)

  .fish0
    object-fit: cover
    height: 100%
    width: 100%
    &.animation
      animation: shrink0 .5s ease-out

  .fish1
    object-fit: cover
    height: $scale1
    width: $scale1
    display: none
    &.animation
      animation: shrink1 .5s ease-out

  .fish2
    object-fit: cover
    height: $scale2
    width: $scale2
    display: none
    &.animation
      animation: shrink2 .5s ease-out
  .fish3
    object-fit: cover
    height: $scale3
    width: $scale3
    display: none
    &.animation
      animation: shrink3 .5s ease-out

  .fish4
    object-fit: cover
    height: $scale4
    width: $scale4
    display: none
    &.animation
      animation: shrink4 .5s ease-out

  .fish5
    object-fit: cover
    height: $scale5
    width: $scale5
    display: none
    &.animation
      animation: shrink5 .5s ease-out

  .fish6
    object-fit: cover
    height: $scale6
    width: $scale6
    display: none

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
