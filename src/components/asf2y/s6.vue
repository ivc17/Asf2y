<template>
  <div class="s6">
    <img src="@/assets/plants.png" class="plants" />
    <img src="@/assets/greens.png" class="greens" />
  </div>
</template>

<script>
export default {
  name: 'S6',
  mounted() {},
  beforeDestroy() {},
  data: function() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="sass">
@import '../../utils/global.sass'
.s6
  position: relative

.plants
  width: 100%
  object-fit: cover
  position: fixed
  top: 0
  left: 0
  z-index: 1
.greens
  height: 50%
  object-fit: cover
  position: absolute
  top: 0
  right: 0
  z-index: 2
</style>
