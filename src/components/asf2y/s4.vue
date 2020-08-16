<template>
  <div class="s4" ref="s4">
    <div class="bamboo">
      <img src="@/assets/bamboo.png" />
    </div>
    <div class="shreds">
      <img src="@/assets/shreds.png" />
    </div>
    <div class="andJuly">
      <div>
        <img src="@/assets/andJulySprite.png" />
      </div>
    </div>
    <div v-html="string" class="s4Text"></div>
    <div :class="{ plugins: true, absolute: pluginPosition === 'absolute' }">
      <img src="@/assets/plugins.png" />
      <img src="@/assets/plugins.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'S4',
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data: function() {
    return {
      pluginPosition: 'fixed',
      text: `覺得無無無無無無不好的時候怎麼辦？無無太少？無無的太慢？真的不能再無無無無了， 無無和無無 還是算了吧，
        無無真的無無了才是無無的。想要無無 想要無無無無值得無無的無，
        想要無無無無不違背初心無無，想做無無無無的，無的起無無想無無無無無無更廣闊的世界，要無無無無天，
        無自由， 無無自由， 無無自由，無無自由 <br> <br> 
        X know XXXXXXXXXX of XXXXXX can't
        XXXXXXXXXXXXXXXX do have problem XXXXXXXXXXXXX indeed#, XX just XXXXXXXXXXXXXXXXXXXXXX. X hope X don't XXXXXXXXXXXXXXXXXXXX important to
        XX please ... really hope XXXXXXXXXXXXXXXXXXXXX<br> <br> 
        如果如果如果可以無無無無無該多好 那是不是現在都無無無無無無無無無無啊
        不管無無無時間出現 無都會無無無的 真的好遺憾 這麼一個如果
        如果無無無了無無無無無無了無 會不會現在什麼都不一樣了
        真的無無再無無無無無 好好的無對無無無無無啊...`
    }
  },
  computed: {
    string: function() {
      return this.text.replace(/([無|X]+)/g, '<del>$1</del> ')
    }
  },
  methods: {
    handleScroll: function() {
      const { bottom } = this.$refs.s4.getBoundingClientRect()
      if (bottom <= window.innerHeight) {
        this.pluginPosition = 'absolute'
      } else {
        this.pluginPosition = 'fixed'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/utils/global.sass'

.s4
  position: relative
  overflow: hidden

.shreds
  width: 800px
  height: 300px
  position: absolute
  left: 50%
  top: 50%
  overflow: hidden
  transform: translateX(-50%) translateY(-50%)
  img
    width: 100%
    object-fit: cover

.plugins
  width: 500px
  height: 80px
  position: fixed
  bottom: 0
  left: 0
  overflow: hidden
  &.absolute
    position: absolute
  img
    display: block
    width: 100%
    animation: showPlugins 10s ease-in-out infinite
    &:last-child
      margin-top: -5px
@keyframes showPlugins
  0%
    transform: translateY(0px)
  8%
    transform: translateY(-80px)
  16%
    transform: translateY(-180px)
  24%
    transform: translateY(-240px)
  32%
    transform: translateY(-300px)
  40%
    transform: translateY(-400px)
  48%
    transform: translateY(-450px)
  56%
    transform: translateY(-530px)
  64%
    transform: translateY(-610px)
  72%
    transform: translateY(-700px)
  80%
    transform: translateY(-780px)
  87%
    transform: translateY(-860px)
  94%
    transform: translateY(-940px)
  100%
    transform: translateY(-100%)

.bamboo
  height: 50%
  width: 80%
  position: absolute
  left: 0
  bottom: 0
  z-index: -1
  img
    width: 100%
    height: 100%
    object-fit: cover
.andJuly
  position: absolute
  height: 40%
  width: 40%
  top: 30%
  div
    overflow: hidden
    height: 100%
    width: 100%
    position: relative
    img
      position: absolute
      width: 300%
      animation: showProcess 2s infinite
      animation-timing-function: step-end

@keyframes showProcess
  0%
    left: 0%
  33%
    left: -100%
  66%
    left: -200%
  100%
    left: -200%

@media (max-width: 1750px)
  .shreds
    right: 0
    left: unset
    top: unset
    bottom: 350px
    transform: translateX(0)

@media (max-width: $lg)
  .andJuly
    top: 40px
    transform: translateX(0)
    width: 100%
    img
      top: 0
  .shreds
    width: 100%
    height: 100%
    left: 0
    top: 40px
    transform: translateX(0)
    img
      width: 100%
      height: 100%
      object-fit: cover
      z-index: 1
  .bamboo
    z-index: 2
    width: 100px
    bottom: 160px
    left: 30px
@media (max-width: $xs)
  .bamboo
    z-index: 2
    width: 90px
    bottom: 160px
    left: 15px
</style>
<style lang="sass">
@import '@/utils/global.sass'
.s4Text
  position: absolute
  bottom: 5rem
  right: 5rem
  width: 70%
  max-width: 800px
  font-size: 20px
  line-height: 30px
  text-align: left
  word-break: break-all
  font-weight: 700
  background-color: #FFFFFF
  padding: 1rem 2rem
  del
    position: relative
    background-color: black
    margin: -3px 0
    transform: rotate(.5deg) skewx(-8deg)
    color: transparent
    user-select: none
    cursor: default
    border-radius: 2px
    animation: noise .5s linear infinite
    background-image: url('../../assets/noise.png')
    &:before
      content: ''
      width: 80%
      height: 100%
      display: inline-block
      position: absolute
      top: 0
      left: 0
      background-color: #000000
      color: transparent
      transform: rotate(.5deg) skewx(-8deg)
      user-select: none
      cursor: default
      border-radius: 2px
      animation: noise .5s linear infinite
      background-image: url('../../assets/noise.png')
    &:nth-child(n):before
      transform: rotate(1deg)
    &:nth-child(2n):before
      transform: rotate(-1deg)
    &:nth-child(5n):before,
      transform: rotate(2deg)
    &:after
      content: ''
      width: 50%
      height: 100%
      display: inline-block
      position: absolute
      background-color: #000000
      animation: noise .5s linear infinite
      background-image: url('../../assets/noise.png')
      transform: rotate(-.5deg) skewx(6deg)
      top: 0
      right: 0
      &:after
        content: ''
    &:nth-child(5n):after,
      transform: rotate(2deg) skewx(-6deg)

@keyframes noise
  50%
    background-image: url('../../assets/noise3.png')
  100%
    background-image: url('../../assets/noise2.png')

.bamboo::before
  content: attr(data-text)
  display: block
  position: absolute
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),linear-gradient(90deg,rgba(255, 0, 0, 0.06),rgba(0, 255, 0, 0.02),rgba(0, 0, 255, 0.06))
  background-size: 100% 2px, 3px 100%
  pointer-events: none
  color: transparent

.bamboo::after
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

@media (max-width: 1400px)
  .s4Text
    bottom: 120px

@media (max-width: $xs)
  .s4Text
    height: 60%
    overflow: scroll
    bottom: unset
    top: 25%
    right: 30px
    font-size: 1rem
    line-height: 1rem
    line-height: 26px
</style>
