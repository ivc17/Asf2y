<template>
  <div class="s5" ref="s5">
    <div class="notThereYet">
      <span>Not there yet. </span>
      <span>Not there yet. </span>
      <span>Not there yet. </span>
    </div>
    <canvas id="s5Canvas" ref="s5Canvas"></canvas>
  </div>
</template>

<script lang="ts">
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'

export default {
  name: 'S5',
  mounted() {
    this.initCanvas()
    window.addEventListener('resize', this.handleResize, false)
  },
  beforeDestroy() {
    this.inView = false
    window.removeEventListener('resize', this.handleResize)
  },
  data: function() {
    return { inView: false }
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
          sunDirection: new THREE.Vector3(),
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
        const sprite = new THREE.Sprite(material)
        sprite.scale.set(60, 40, 0)
        sprite.position.set(-20, 100, 150)
        scene.add(sprite)
        const sprite2 = new THREE.Sprite(material)
        sprite2.scale.set(60, 40, 0)
        sprite2.position.set(-20, 63, 150)
        scene.add(sprite2)
        const sprite3 = new THREE.Sprite(material)
        sprite3.scale.set(60, 40, 0)
        sprite3.position.set(-20, 20, 150)
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

      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
var camera, scene, renderer, water
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'

.s5
  position: relative
  overflow: hidden

#s3Canvas
  height: 100%
  width: 100%

.notThereYet
  position: absolute
  font-size: $marqueeFontLg
  height: 100%
  top: 0
  right: 0
  text-align: right
  white-space: nowrap
  writing-mode: vertical-rl
  text-orientation: mixed
  text-stroke: 1px #FFFFFF
  line-height: 1
  -webkit-text-stroke: 1px #FFFFFF
  color: rgba(0, 0, 0, 0)
  transform: translateY(-50%)
  animation: marquee 3s linear infinite

@keyframes marquee
  0%
    transform: translateY(-50%)
  100%
    transform: translateY(0%)




@media (max-width: $lg)
  .notThereYet
    font-size: $marqueeFontSm
</style>
