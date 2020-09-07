<template>
  <div :class="{ controls: true, hover: !stable }">
    <!-- eslint-disable-next-line-->
    <router-link class="back" :to="link" v-if="!isExternal"></router-link>
    <a class="back" :href="link" v-if="isExternal"></a>
  </div>
</template>

<script>
export default {
  name: 'Control',
  props: {
    link: { type: String, required: true },
    isExternal: { type: Boolean },
    stable: { type: Boolean }
  }
}
</script>

<style lang="sass" scoped>
@keyframes disappear
  0%
    opacity: 1
  100%
    opacity: 0

.controls
  z-index: 5
  width: 100%
  position: fixed
  top: 0
  height: 100px

.hover
  opacity: 0
  animation: disappear 1s
  &:hover
    opacity: 1

.back
  margin-top: 1rem
  border-radius: 41px
  width: 140px
  height: 40px
  display: block
  cursor: pointer
  border: 2px solid #000000
  background-image: url('../assets/icons/backIcon.svg')
  background-repeat: no-repeat
  background-size: 140px 40px
  background-position: center center
  &:hover
    border: 2px solid rgba(0,0,0,0)
</style>
