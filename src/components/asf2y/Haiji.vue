<template>
  <transition v-on:enter="enter" v-on:leave="leave">
    <div
      class="haiji"
      v-show="haijiInView"
      :style="[{ height: `${haijiHeight}px` }, styles]"
      :class="classname"
      id="haiji"
    >
      <img src="@/assets/haiji1.png" class="haiji1" />
      <transition v-on:enter="enter" v-on:leave="leave">
        <img src="@/assets/haiji2.png" class="haiji2" v-if="end" />
      </transition>
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  name: 'Haiji',
  props: {
    haijiInView: {
      type: Boolean,
      default: true
    },
    haijiHeight: {
      type: Number,
      required: true
    },
    classname: {
      type: String
    },
    styles: {
      type: Object
    },
    end: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    enter: function(el) {
      Velocity(el, 'fadeIn', { duration: 100 })
    },
    leave: function(el) {
      Velocity(el, 'fadeOut', { duration: 100, delay: 1000 })
    }
  }
}
</script>

<style lang="sass" scoped>
.haiji
  background-color: #000000
  width: 40%
  max-width: 500px
  overflow: hidden
  transition: .2s
  display: flex
  flex-direction: column
  justify-content: space-between
  position: absolute
  height: 0
  left: 50%
  transform: translateX(-50%)
.haiji1
  width: 100%
.haiji2
  position: absolute
  width: 100%
  bottom: 0
  left: 0
  transform: translateY(-100%)
</style>
