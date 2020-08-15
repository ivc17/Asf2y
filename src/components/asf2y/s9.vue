<template>
  <div class="s9" ref="s9">
    <img class="sunny" src="@/assets/sunny.png" />

    <img class="balloons" src="@/assets/balloons.png" />
    <img class="marbleAd" src="@/assets/marbleAd.png" />
    <img class src="@/assets/makeSomeoneLaugh.png" />
    <img class src="@/assets/candy.png" />

    <img class="fog" src="@/assets/fog.png" />
    <canvas ref="s9Canvas" class="s9Canvas"></canvas>
    <div class="leftCol">
      <div>
        <img class src="@/assets/view.png" />
        <img class="underSun" src="@/assets/underSun.png" />
      </div>
    </div>
    <div class="underTheSun">
      <vue-typed-js
        :strings="[`今の私は、\n陽だまりの下で\n在海的上面`]"
        :loop="true"
        :typeSpeed="130"
        :showCursor="false"
        :backDelay="1000"
        :backSpeed="20"
      >
        <span class="typing"></span>
      </vue-typed-js>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

export default {
  name: 'S9',
  components: {},
  mounted() {
    this.initCanvas()
  },
  beforeDestroy() {},
  data: function() {
    return {}
  },
  methods: {
    initCanvas: function() {
      this.inView = true
      const canvas = this.$refs.s9Canvas
      const init = () => {
        renderer = new THREE.WebGLRenderer({ canvas })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(canvas.width, canvas.height)

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          1,
          20000
        )
        camera.position.set(-20, 200, 300)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        sun = new THREE.Vector3()
        camera.lookAt(sun)
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
          sunColor: 0xdbf5ff,
          waterColor: 0x8ab7ff,
          distortionScale: 3,
          fog: scene.fog !== undefined
        })
        water.rotation.x = -Math.PI / 2
        scene.add(water)

        var sky = new Sky()
        sky.scale.setScalar(10000)
        scene.add(sky)
        var uniforms = sky.material.uniforms
        uniforms['turbidity'].value = 2.1
        uniforms['rayleigh'].value = 1.6
        uniforms['mieCoefficient'].value = 0.009
        uniforms['mieDirectionalG'].value = 0
        var parameters = {
          inclination: 0.49,
          azimuth: 0.1
        }
        var pmremGenerator = new THREE.PMREMGenerator(renderer)
        function updateSun() {
          var theta = Math.PI * (parameters.inclination - 0.5)
          var phi = 2 * Math.PI * (parameters.azimuth - 0.5)

          sun.x = 0
          sun.y = Math.sin(phi) * Math.sin(theta)
          sun.z = Math.sin(phi) * Math.cos(theta)

          sky.material.uniforms['sunPosition'].value.copy(sun)
          water.material.uniforms['sunDirection'].value.copy(sun).normalize()

          scene.environment = pmremGenerator.fromScene(sky).texture
        }

        updateSun()
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
      const canvas = this.$refs.s9Canvas
      camera.aspect = canvas.width / canvas.height
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
var camera,
  scene,
  renderer,
  water,
  sun = null
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'

.s9
  position: relative
  img
    width: 100px
    &.sunny
      height: 100%
      right: 50%
      position: absolute
      width: auto
      z-index: -1
    &.marbleAd
      position: absolute
      height: 60%
      width: auto
      top: 20%
      left: 10%
    &.fog
      // position: absolute
      // right: 0
      // width: 70%
      // height: 40%
      // object-fit: cover
      // top: 30%
    &.balloons
      position: absolute
      right: 0
      width: 60%
      height: 30%
      object-fit: cover
      top: 30%

.leftCol
  position: absolute
  right: 0
  top: 0
  height: 100%
  width: 100%
  display: flex
  justify-content: flex-end
  &>div
    position: relative
    width: 30%
    height: 100%
    .underSun
      object-fit: cover
      width: 100%
      right: 0
      bottom: 0
      position: absolute
    .view

.s9Canvas
  position: absolute
  height: 30%
  width: 30%
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  z-index: 4

.underTheSun
  top: 30%
  right: 0
  width: 30%
  position: fixed
  bottom: 0
  left: 50%
  transform: translateX(-50%)
.typing
  width: 100%
  color: #ffffff
  font-size: 3rem
  font-weight: 900
  white-space: pre-wrap
  text-align: left
</style>
