<template>
  <div class="s6" ref="s6">
    <img
      src="@/assets/plants.png"
      class="plants"
      :style="{
        opacity: plantOpacity,
        position: plantPosition
      }"
    />
    <img src="@/assets/greens.png" class="greens" />
    <img src="@/assets/coconutTree.png" class="coconutTree" />
    <Haiji
      :haijiHeight="haijiHeight"
      classname="haijiClassS6"
      :haijiInView="haijiInView"
    ></Haiji>
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
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data: function() {
    return {
      haijiInView: true,
      plantOpacity: 0,
      haijiHeight: 0,
      plantPosition: 'fixed'
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
        if (top < -300) this.plantPosition = 'absolute'
      } else this.plantPosition = 'fixed'

      this.haijiInView = !(top < -window.innerHeight / 3)
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'
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

.coconutTree
  position: absolute
  bottom: 0
  right: 0
  width: 50%
  z-index: 3
</style>
