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
.controls
  z-index: 5
  width: 100%
  position: fixed
  top: 0
  height: 100px

.hover
  opacity: 0
  &:hover
    opacity: 1

.back
  width: 100px
  height: 100px
  display: block
  cursor: pointer
  background-image: url('../assets/icons/backIcon.svg')
  background-repeat: no-repeat
  background-size: 100px 100px
</style>
