<template>
  <div
    class="notification wrap"
    ref="notifWrap"
    :style="{
      height: height + 'px',
      transition: transitionTime ? transitionTime + 's ease-in' : '.5s ease-in'
    }"
  >
    <img :src="src" class="notification" />
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['name', 'progress', 'delay', 'timing', 'transitionTime'],
  data: function() {
    return {
      height: 0,
      progressIdx: 0
    }
  },
  mounted() {
    this.intervalId = setInterval(this.reveal, this.timing)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    reveal() {
      if (this.$refs.notifWrap && this.progress) {
        if (this.progressIdx >= this.progress.length - 1) {
          this.progressIdx = 0
          this.height = 0
        } else {
          this.progressIdx = this.progressIdx + 1
          this.height = this.progress[this.progressIdx]
        }
      }
    },
    getImgUrl(pic) {
      return require('../../assets/' + pic)
    }
  },
  computed: {
    src: function() {
      return this.getImgUrl(this.name + '.png')
    }
  }
}
</script>

<style lang="sass">
@import '../../utils/global.sass'

.notification
  width: 50vw
  max-width: 600px
  &.wrap
    height: 0px
    overflow: hidden
    transition: .5s ease-in

@media (max-width: $lg)
  .notification
    width: 90vw
</style>
