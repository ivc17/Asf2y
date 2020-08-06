<template>
  <section class="s2" ref="s2">
    <div class="block"></div>
    <canvas id="canvas-s2" ref="canvas" v-on:load="loadImg"></canvas>
    <!-- <img src="../../assets/scene.jpg" /> -->
  </section>
</template>

<script lang="ts">
// import * as THREE from 'three'

export default {
  name: 'S2',
  mounted() {
    window.addEventListener('load', this.loadImg)
    this.$refs.canvas.width = window.innerWidth
    this.$refs.canvas.height = window.innerHeight
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('load', this.load)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    loadImg() {
      const ctx = this.$refs.canvas.getContext('2d')
      const img = new Image(window.innerWidth, window.innerHeight)
      img.src = '../../assets/scene.jpg'
      console.log(img, ctx)
      img.onload = function() {
        console.log('loaded')
        ctx.drawimage(img)
      }
    },
    handleScroll() {
      const bounding = this.$refs.s2.getBoundingClientRect()
      console.log(bounding)
    }
  }
}
</script>

<style scoped lang="sass">
.block
  height: 400px
  width: 400px
  background: #000000
  margin: 0 auto
  transform: translateY(-50%)
  z-index: 4
</style>
