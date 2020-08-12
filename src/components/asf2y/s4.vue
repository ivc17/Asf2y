<template>
  <div class="s4" ref="s4">
    <!-- <div class="bamboo">
      <img src="@/assets/bamboo.png" />
    </div>-->
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
        XX please ... really hope X XXXXXXXXXXXXXXXXXXX<br> <br> 
        如果如果如果可以無無無無無該多好 那是不是現在都無無無無無無 無無無啊
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

// .bamboo
//   height: 50%
//   width: 80%
//   position: absolute
//   left: 0
//   bottom: 0
//   z-index: -1
//   img
//     width: 100%
//     height: 100%
//     object-fit: cover
.andJuly
  position: absolute
  height: 40%
  width: 40%
  top: 30%
  left: 0
  transform: translateX(-50px)
  background-color: #FFFFFF
  div
    overflow: hidden
    height: 100%
    width: 100%
    position: relative
    img
      position: absolute
      top: -6px
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
    transform: translateX(0) translateY(0)
    left: 0
    bottom: 0
    img
      object-fit: cover
      transform: rotate(180deg)
      z-index: 1
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
  word-break: keep-all
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
      transform: rotate(-.5deg) skewx(6deg)
      top: 0
      right: 0
    &:nth-child(5n):after,
      transform: rotate(2deg) skewx(-6deg)

@media (max-width: $md)
  .s4Text
    bottom: 12rem
    right: 2rem
    font-size: 16px
    line-height: 26px
</style>
