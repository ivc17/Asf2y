<template>
  <div :class="['imageMarqueWrap', classname]">
    <div class="marquee1 marquee">
      <img v-for="i in srcs" :src="i" :key="i" />
    </div>
    <div class="marquee2 marquee">
      <img v-for="i in srcs" :src="i" :key="i" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'classname'],
  name: 'LoopMarquee',

  data: function() {
    return {}
  },
  computed: {
    srcs: function() {
      return this.content.map(i => this.getImgUrl(i))
    }
  },
  methods: {
    getImgUrl(pic) {
      return require('../../assets/' + pic + '.jpg')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../utils/global.sass'

.imageMarqueWrap
  height: 100%
  position: relative

.marquee
  height: 100%
  width: 100%
  display: flex
  img
    height: 100%
    width: 50vw
    object-fit: cover

@media (max-width: $md)
  .marquee
    img
      width: 100%
      &:last-child
        display: none

.marquee1
  position: absolute
  left: 0
  top: 0
  animation-name: shift
  animation-duration: 5s
  animation-iteration-count: infinite
  animation-timing-function: linear

.marquee2
  position: absolute
  left: 0
  top: 0
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

@keyframes shift3
  from
    transform: translateX(-50%)

  to
    transform: translateX(0%)
</style>
