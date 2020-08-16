<template>
  <div class="back" ref="back">
    <div class="bg">
      <img src="@/assets/olSun.svg" class="titleBg sun" />
      <img src="@/assets/olOpen.svg" class="titleBg open" />
      <img src="@/assets/olSea.svg" class="titleBg sea" />
    </div>
    <transition name="fade">
      <router-link to="/" class="return" v-show="inView">返回</router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Back',
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data: function() {
    return {
      inView: false
    }
  },
  methods: {
    handleScroll: function() {
      const { top } = this.$refs.back.getBoundingClientRect()
      this.inView = top <= window.innerHeight / 2
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../utils/global.sass'
.back
  position: relative
.bg
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: space-between

.titleBg
  font-weight: 900
  font-size: 40rem
  text-stroke: 1px black
  -webkit-text-stroke: 1px black
  color: rgba(0, 0, 0, 0)
  height: 100%
  &.sun
  &.shut
  &.sea
    transform: rotate(180deg)

.return
  display: block
  font-weight: 900
  font-size: 10rem
  position: absolute
  top: 0
  color: #000000
  text-decoration: none
  &:after
    content: ''
    border: solid black
    border-width: 0 3px 3px 0
    display: inline-block
    padding: 3px
    transform: rotate(135deg)

@media (min-width: 80rem) and (min-height:40rem)
  .return
    font-size: 40rem

@media (max-width: $lg)
  .bg
    flex-direction: column

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
