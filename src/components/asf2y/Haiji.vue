<template>
  <transition name="fade">
    <div
      class="haiji"
      v-show="haijiInView"
      :style="[{ height: `${haijiHeight}px` }, styles]"
      :class="classname"
      id="haiji"
    >
      <img src="@/assets/haiji1.png" class="haiji1" />
      <transition name="fade">
        <img src="@/assets/haiji2.png" class="haiji2" v-if="end" />
      </transition>
    </div>
  </transition>
</template>

<script>
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
  }
}
</script>

<style lang="sass" scoped>
@import '../../utils/global.sass'

.haiji
  background-color: #000000
  width: 40%
  max-width: 500px
  min-width: 250px
  overflow: hidden
  transition: .2s
  display: flex
  flex-direction: column
  justify-content: space-between
  position: absolute
  height: 0
  left: 50%
  transform: translateX(-50%)
  align-items: center
.haiji1
  width: 100%
.haiji2
  position: absolute
  width: 100%
  bottom: 40px
  left: 0
  transform: translateY(-100%)

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

@media (max-width: $md)
  .haiji1,
    width: 160%
  .haiji2
    width: 160%
    transform: translateX(-15%)
</style>
