<template>
  <div class="s3" ref="s3">
    <canvas id="s3Canvas" ref="s3Canvas"></canvas>
    <Sun
      :class="{ sun: true, parallex: parallex }"
      v-if="loaderOff"
      :style="parallexStyle"
    ></Sun>
    <transition>
      <div class="loading" v-if="!loaderOff" v-on:leave="leave">
        <vue-typed-js
          :strings="['SINK\nSANK\nSUNK']"
          :typeSpeed="1"
          :backSpeed="10"
        >
          <span class="typing sink"></span>
        </vue-typed-js>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Velocity from 'velocity-animate'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { GlitchPass } from '@/utils/glitchPass.js'
import Sun from './Sun.vue'

export default {
  name: 'S3',
  components: { Sun },
  data: function() {
    return {
      inView: false,
      loaded: false,
      loaderOff: false,
      parallex: false,
      parallexStyle: null,
      parallexVar: 0.6
    }
  },
  watch: {
    loaded: function() {
      if (this.loaded) {
        setTimeout(() => (this.loaderOff = true), 2000)
      }
    }
  },
  mounted() {
    this.canvasInit()
    this.handleScroll()
    this.handleResize()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    this.inView = false
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    leave: function(el) {
      Velocity(el, 'fadeOut', { duration: 300 })
    },
    handleScroll: function() {
      const { top, bottom } = this.$refs.s3.getBoundingClientRect()
      if (bottom <= window.innerHeight) {
        this.parallex = true
      } else {
        this.parallex = false
      }
      if (this.parallex) {
        this.parallexStyle = {
          transform: `translateY(${top * this.parallexVar}px)`
        }
      } else {
        this.parallexStyle = {
          transform: `translateY(0)`
        }
      }
    },
    handleResize: function() {
      window.innerHeight > window.innerWidth
        ? (this.parallexVar = 0.8)
        : (this.parallexVar = 0.6)
    },
    canvasInit: function() {
      this.inView = true

      var frustumSize = 5
      var aspect = window.innerHeight / window.innerWidth
      const canvas = document.querySelector('#s3Canvas')
      const renderer = new THREE.WebGLRenderer({ canvas })
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const camera = new THREE.OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        (frustumSize * aspect) / 2,
        (frustumSize * aspect) / -2,
        0,
        1
      )

      const scene = new THREE.Scene()
      renderer.setClearColor(0xffffff)

      let loaded = false
      var map = new THREE.TextureLoader().load('./images/scene.jpg', () => {
        if (loaded) {
          this.loaded = true
          requestAnimationFrame(render)
        } else {
          loaded = true
        }
      })
      var material = new THREE.SpriteMaterial({
        map: map
      })
      var sprite = new THREE.Sprite(material)
      sprite.scale.set(3.5, 3, 1)
      sprite.position.set(-2, 0, 0)
      scene.add(sprite)

      var map2 = new THREE.TextureLoader().load('./images/flower.jpg', () => {
        if (loaded) {
          this.loaded = true
          requestAnimationFrame(render)
        } else {
          loaded = true
        }
      })
      var material2 = new THREE.SpriteMaterial({
        map: map2
      })
      var sprite2 = new THREE.Sprite(material2)
      sprite2.scale.set(1, 0.6, 1)
      sprite2.position.set(2, 0, 0)
      scene.add(sprite2)

      var map3 = new THREE.TextureLoader().load('./images/beam.jpg', () => {
        if (loaded) {
          requestAnimationFrame(render)
        } else {
          loaded = true
        }
      })
      var material3 = new THREE.SpriteMaterial({
        map: map3
      })
      var sprite3 = new THREE.Sprite(material3)
      sprite3.scale.set(5, 5, 0)
      sprite3.position.set(1, 0, -1)
      scene.add(sprite3)

      const composer = new EffectComposer(renderer)

      composer.addPass(new RenderPass(scene, camera))
      const glitchPass = new GlitchPass()
      composer.addPass(glitchPass)

      const filmPass = new FilmPass(0.1, 0.3, 648, 0)
      filmPass.renderToScreen = true
      composer.addPass(filmPass)

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }
      let then = 0
      const render = now => {
        if (this.inView) {
          now *= 0.001
          const deltaTime = now - then
          then = now
          if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement
            var aspect = window.innerHeight / window.innerWidth
            camera.left = frustumSize / -2
            camera.right = frustumSize / 2
            camera.top = (frustumSize * aspect) / 2
            camera.bottom = (frustumSize * aspect) / -2
            camera.updateProjectionMatrix()
            composer.setSize(canvas.width, canvas.height)
          }
          composer.render(deltaTime)
          requestAnimationFrame(render)
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'

.s3
  position: relative

#s3Canvas
  height: 100%
  width: 100%

.loading
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  background: #000000

.sink
  color: #FFFFFF
  position: absolute
  top: 0
  left: 0
  font-size: 20vmin
  font-family: $fontFamily
  font-weight: 900
  text-align: start
  margin-right: 0
  margin-left: auto
  white-space: pre-wrap

.sun
  z-index: 3
  position: absolute
  right: 0
  bottom: -50px

.parallex
  position: fixed
  bottom: 100px

@media (min-width: $lg)
  .sun
    max-width: 1200px
  .parallex
    bottom: 0
</style>
