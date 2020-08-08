<template>
  <div class="crossMarqueWrap">
    <div class="crossMarqueSectionWrap">
      <h1
        v-for="n in count"
        :key="n"
        :class="{
          crossMarqueText: true,
          animationL: n % 2 === 0,
          animationR: n % 2 === 1
        }"
      >
        {{ content }}
      </h1>
    </div>
    <div>
      <h1
        v-for="n in count"
        :key="n"
        :class="{
          crossMarqueText: true,
          animationL2: n % 2 === 0,
          animationR2: n % 2 === 1
        }"
      >
        {{ content }}
      </h1>
    </div>
  </div>
</template>

<script>
import { breakpoints } from '../../utils/breakpoints.js'

export default {
  props: ['content'],
  name: 'CrossMarquee',
  data: function() {
    return {
      count: 0
    }
  },
  methods: {
    calString: function() {
      window.innerWidth > breakpoints.lg
        ? (this.count = Math.round(window.innerHeight / 84))
        : (this.count = 30)
      return
    }
  },
  mounted() {
    window.addEventListener('resize', this.calString)
    this.calString()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calString)
  }
}
</script>

<style lang="sass" scoped>
@import '../../utils/global.sass'

.crossMarqueWrap
  position: relative

.crossMarqueText
  text-align: left
  padding: 0
  line-height: 1
  width: 100%
  overflow: hidden
  font-size: $marqueeFontLg
  text-stroke: 1px black
  -webkit-text-stroke: 1px black
  color: rgba(0, 0, 0, 0)

@media (max-width: $lg)
  .crossMarqueText
    font-size: $marqueeFontSm

.crossMarqueSectionWrap
  position: absolute
  top: 0
  left: 0

.animationL
  animation-name: shiftL
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

.animationR
  animation-name: shiftR
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

.animationL2
  animation-name: shiftL2
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

.animationR2
  transform: translateX(-100%)
  animation-name: shiftR2
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

@keyframes shiftR
  from
    transform: translateX(0)
  to
    transform: translateX(100%)

@keyframes shiftR2
  from
    transform: translateX(-100%)
  to
    transform: translateX(0)

@keyframes shiftL
  from
    transform: translateX(100%)
  to
    transform: translateX(0%)

@keyframes shiftL2
  from
    transform: translateX(0%)
  to
    transform: translateX(-100%)
</style>
