<template>
  <div class="s6" ref="s6">
    <img
      src="@/assets/plants.jpg"
      class="plants"
      :style="{
        opacity: plantOpacity,
        position: plantPosition
      }"
    />
    <img src="@/assets/greens.jpg" class="greens" />
    <img src="@/assets/coconutTree.jpg" class="coconutTree" />
    <img class="makeSomeoneLaugh" src="@/assets/makeSomeoneLaugh.jpg" />
    <img class="coconutTree" src="@/assets/forest.jpg" />
    <Haiji
      :haijiHeight="haijiHeight"
      class="haijiClassS6"
      :haijiInView="haijiInView"
    ></Haiji>
    <div
      class="ascending"
      ref="ascending"
      v-show="ascendingInView"
      :style="{
        position: plantPosition
      }"
    >
      <span>Ascending</span>
      <span>Ascending</span>
      <span>Ascending</span>
    </div>
  </div>
</template>

<script>
import Haiji from './Haiji.vue'

export default {
  name: 'S6',
  components: { Haiji },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    const spans = this.$refs.ascending.querySelectorAll('span')
    const set = () => {
      spans.forEach((span, idx) => {
        setTimeout(() => (span.style.opacity = 1), 500 * (2 - idx + 1))
      })
    }
    set()
    this.intervalId = setInterval(() => {
      spans.forEach(span => (span.style.opacity = 0))
      set()
    }, 2000)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    clearInterval(this.intervalId)
  },
  data: function() {
    return {
      haijiInView: true,
      plantOpacity: 0,
      haijiHeight: 0,
      plantPosition: 'fixed',
      ascendingInView: false
    }
  },
  methods: {
    handleScroll: function() {
      const { top } = this.$refs.s6.getBoundingClientRect()
      const ratio =
        Math.round(((window.innerHeight - top) / window.innerHeight) * 100) /
        100
      if (top > 0) {
        this.plantOpacity = ratio - 0.3
      }
      if (top < window.innerHeight) {
        this.haijiHeight = ratio * window.innerHeight
      }
      if (top < 0) {
        this.plantOpacity = 1
        if (top < 0) this.plantPosition = 'absolute'
      } else this.plantPosition = 'fixed'

      this.haijiInView = !(top < -window.innerHeight / 3)
      this.ascendingInView =
        top < window.innerHeight / 3 && top > (-window.innerHeight * 2) / 3
    }
  }
}
</script>

<style scoped lang="sass">
.s6
  position: relative
  overflow: hidden

.s6 .plants
  width: 100%
  object-fit: cover
  position: fixed
  bottom: 0
  left: 0
  z-index: 1

.greens
  height: 50%
  top: 0
  right: 0
  z-index: 2
  position: absolute

.haijiClassS6
  top: -300px
  z-index: 3

.makeSomeoneLaugh
  width: 100%

.coconutTree
  position: absolute
  bottom: 0
  right: 0
  width: 50%
  height: 300px
  z-index: 3
  object-fit: cover

.ascending
  position: absolute
  writing-mode: vertical-rl
  text-orientation: mixed
  bottom: 0
  z-index: 4
  color: rgba(0,0,0,0)
  left: 50%
  font-size: 3rem
  font-weight: 900
  text-stroke: 1px #FFFFFF
  -webkit-text-stroke: 1px #FFFFFF

  span
    opacity: 0
    transition: none
    &:first-child
      font-size: 4rem
    &:nth-child(2)
      font-size: 3rem
    &:nth-child(3)
      font-size: 2rem
</style>
