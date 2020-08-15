<template>
  <div class="s5" ref="s5">
    <div id="s5SvgContainer" v-html="svg"></div>
    <canvas id="s5Canvas" ref="s5Canvas"></canvas>
    <Haiji
      :haijiInView="haijiInView"
      :haijiHeight="haijiHeight"
      class="haijiClassS5"
      :styles="{ top: haijiTop + 'px' }"
    ></Haiji>
  </div>
</template>

<script lang="ts">
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'
import { breakpoints } from '@/utils/breakpoints.js'
import Haiji from './Haiji.vue'

export default {
  name: 'S5',
  components: { Haiji },
  mounted() {
    this.initCanvas()
    window.addEventListener('resize', this.handleResize, false)
    window.addEventListener('scroll', this.handleScroll)
    this.handleSvg()
    this.intervalId = setInterval(() => {
      this.moveText()
    }, 1)
    this.haijiTop = window.innerHeight - 300
  },
  beforeDestroy() {
    this.inView = false
    clearInterval(this.intervalId)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
  data: function() {
    return {
      inView: false,
      svg: '',
      fontSize: 128,
      text:
        'Not there yet. Not there yet. Not there yet. Not there yet. Not there yet. Not there yet. Not there yet.',
      haijiInView: false,
      haijiHeight: 0,
      haijiTop: 0
    }
  },
  methods: {
    initCanvas: function() {
      this.inView = true
      const init = () => {
        renderer = new THREE.WebGLRenderer({ canvas: this.$refs.s5Canvas })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          1,
          20000
        )
        camera.position.set(30, 200, 300)
        camera.lookAt(0, 0, 0)

        const directionalLight = new THREE.DirectionalLight(0x83ebde, 0.8)
        directionalLight.position.set(30, 200, 300)
        scene.add(directionalLight)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        const waterGeometry = new THREE.PlaneBufferGeometry(5000, 5000)
        water = new Water(waterGeometry, {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: new THREE.TextureLoader().load(
            './textures/waternormals.jpg',
            function(texture) {
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            }
          ),
          alpha: 1,
          sunColor: 0xf54263,
          waterColor: 0x275751,
          distortionScale: 5,
          fog: scene.fog !== undefined
        })
        water.rotation.x = -Math.PI / 2
        scene.add(water)

        const map = new THREE.TextureLoader().load('./images/sign.jpg')
        const material = new THREE.SpriteMaterial({
          map: map
        })
        x = window.innerWidth < breakpoints.md ? -10 : -30
        sprite = new THREE.Sprite(material)
        sprite.scale.set(60, 40, 0)
        sprite.position.set(x, 100, 150)
        scene.add(sprite)
        sprite2 = new THREE.Sprite(material)
        sprite2.scale.set(60, 40, 0)
        sprite2.position.set(x, 63, 150)
        scene.add(sprite2)
        sprite3 = new THREE.Sprite(material)
        sprite3.scale.set(60, 40, 0)
        sprite3.position.set(x, 20, 150)
        scene.add(sprite3)
      }

      const animate = () => {
        if (this.inView) {
          requestAnimationFrame(animate)
          render()
        }
      }

      function render() {
        water.material.uniforms['time'].value += 2.0 / 60.0
        renderer.render(scene, camera)
      }
      init()
      animate()
    },
    handleResize: function() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      sprite.position.set(x, 100, 150)
      sprite2.scale.set(60, 40, 0)
      sprite3.position.set(x, 20, 150)
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.haijiTop = window.innerHeight - 300
      this.handleSvg()
    },
    handleSvg: function() {
      this.getFontSize()
      this.svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${
        window.innerHeight
      }" width="${window.innerWidth}">
     <path id="p" d="m 0 ${this.fontSize} H ${window.innerWidth -
        this.fontSize} V ${
        window.innerHeight
      }" fill='none'/> <text width="100%" style="transform:translate3d(0,0,0);" x-link:href="#p">

        <textPath  class="notThereYet" style="stroke:#FFFFFF;stroke-width:1px" alignment-baseline="center" xlink:href="#p">${
          this.text
        }</textPath>
    </text>
     </svg>`
    },
    getFontSize: function() {
      if (window.innerWidth < breakpoints.lg) {
        this.fontSize = 100
      } else {
        this.fontSize = 128
      }
    },
    moveText: function() {
      const el = document.querySelector('.notThereYet')
      if (offset > 0) offset = -50
      offset += 0.04
      el.setAttribute('startOffset', offset + '%')
    },
    handleScroll: function() {
      const { bottom } = this.$refs.s5.getBoundingClientRect()

      if (bottom < window.innerHeight) {
        const ratio =
          Math.round(
            ((window.innerHeight - bottom) / window.innerHeight) * 100
          ) / 100
        if (bottom < window.innerHeight - 60) this.haijiInView = true
        this.haijiHeight = ratio * window.innerHeight
      } else {
        this.haijiInView = false
      }
    }
  }
}
var offset = -50

var camera,
  scene,
  renderer,
  water,
  x = 30,
  sprite,
  sprite2,
  sprite3
</script>

<style lang="sass">
@import '../../utils/global.sass'

.s5
  position: relative
  overflow: hidden

#s3Canvas
  height: 100%
  width: 100%

#s5SvgContainer
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%

.notThereYet
  font-size: 128px
  text-align: right
  fill: none
  color: rgba(0, 0, 0, 0)
  start-offset: 0%

@media (max-width: $lg)
  .notThereYet
    font-size: 100px

.haijiClassS5
  bottom: 300px
  z-index: 3
</style>
