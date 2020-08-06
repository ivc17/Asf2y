<template>
  <div class="smoothMarqueWrap">
    <h1 class="title marquee1">{{ string }}</h1>
    <h1 class="title marquee2">{{ string }}</h1>
  </div>
</template>

<script>
import { breakpoints } from '../../utils/breakpoints.js'

export default {
  props: ['content'],
  name: 'CrossMarquee',

  data: function() {
    return { string: this.content }
  },
  methods: {
    calString: function() {
      window.innerWidth > breakpoints.lg
        ? (this.string = this.content.repeat(window.innerHeight / 84))
        : (this.string = this.content.repeat(30))
    }
  },
  mounted() {
    this.calString()
    window.addEventListener('resize', this.calString)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calString)
  }
}
</script>

<style lang="sass" scoped>
.smoothMarqueWrap
  height: 100%

.title
  text-align: justify
  padding: 0
  white-space: pre-wrap
  position: absolute
  left: 0
  top: 0
  width: 100%
  overflow: hidden
  font-size: 10rem
  text-stroke: 1px black
  line-height: 1
  -webkit-text-stroke: 1px black
  color: rgba(0, 0, 0, 0)
  transform: translateX(0)

@media (max-width: 1199.98px)
  .title
    font-size: 5rem

.marquee1
  animation-name: shift
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

.marquee2
  transform: translateX(-100%)
  animation-name: shift2
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

@keyframes shift
  from
    transform: translateX(0)

  to
    transform: translateX(100%)

@keyframes shift2
  from
    transform: translateX(-100%)

  to
    transform: translateX(0%)
</style>
