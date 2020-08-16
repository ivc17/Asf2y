<template>
  <div class="s8" ref="s8">
    <div :class="{ laugh: true, fixed: fixed, move: move, hide: hide }">
      <p>笑って</p>
    </div>
    <div :class="{ lifeIsBeautiful: true, move: move, hide: hide }">
      Life is beautiful
    </div>
  </div>
</template>

<script>
export default {
  name: 'S8',
  components: {},
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data: function() {
    return {
      fixed: false,
      move: false,
      hide: false
    }
  },
  methods: {
    handleScroll: function() {
      const { top, bottom } = this.$refs.s8.getBoundingClientRect()
      const h = window.innerHeight
      this.fixed = top < h && top > h / 2
      this.move = !this.fixed && top < h * 0.7
      this.hide = bottom < h * 0.8
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'

.s8
  position: relative

.lifeIsBeautiful
  position: absolute
  top: 30%
  width: 50%
  left: 50%
  color: #000000
  transform: translateX(-50%)
  font-size: 2rem
  font-weight: 900
  transition: none
  &.move
    position: fixed
    top: 60%
  &.hide
    position: absolute
    top: unset
    bottom: 2rem

.laugh
  width: 100%
  position: absolute
  top: 35%
  left: 50%
  color: #FFFFFF
  transform: translateX(-50%)
  font-size: 10rem
  font-weight: 900
  text-stroke: 1px #000000
  -webkit-text-stroke: 1px #000000
  opacity: .1
  color: #FFFFFF
  transition: none
  animation: flash 1s ease-in-out alternate infinite 1s
  &.fixed
    position: fixed
    top: unset
    bottom: 2rem
  &.move
    position: fixed
    top: 65%
  &.hide
    position: absolute
    top: unset
    bottom: 0
@media (max-width: $lg)
  .laugh
    font-size: 5rem

@keyframes flash
  40%
    opacity: 1
  100%
    opacity: 1
</style>
