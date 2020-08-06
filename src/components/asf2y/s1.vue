<template>
  <section class="s1" id="s1">
    <div class="s1-wrap">
      <div class="notificationPosition">
        <Notification
          v-show="current === 'storm'"
          name="storm"
          :progress="stormProgress"
          :timing="timing2"
        ></Notification>

        <Notification
          v-show="current === 'thx'"
          name="thx"
          :progress="thxProgress"
          :timing="timing2"
        ></Notification>
      </div>
      <div class="marqueePosition">
        <smooth-marquee :content="content"></smooth-marquee>
      </div>
      <div class="marqueePosition2" v-show="isOnScroll">
        <cross-marquee :content="content"></cross-marquee>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from './Notification.vue'
import CrossMarquee from './CrossMarquee.vue'
import SmoothMarquee from './SmoothMarquee.vue'

export default {
  name: 'S1',
  components: {
    Notification,
    CrossMarquee,
    SmoothMarquee
  },
  data: function() {
    return {
      content: 'AfterSleepingFor2Years\n',
      images: ['storm', 'thx'],
      current: 'storm',
      timing1: 600,
      timing2: 400,
      thxProgress: [0, 60, 220, 370.5, 370.5, 0],
      stormProgress: [0, 220, 220, 220, 0, 0],
      isOnScroll: false
    }
  },
  computed: {
    progress: function() {
      return this.current === 'storm' ? this.stormProgress : this.thxProgress
    }
  },
  mounted() {
    this.intervalId = setInterval(
      this.changeImage,
      this.stormProgress.length * this.timing1
    )
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    changeImage() {
      const idx = this.images.findIndex(i => {
        return i === this.current
      })
      const img = idx >= 1 ? this.images[0] : this.images[idx + 1]
      this.current = img
    },
    handleScroll() {
      this.isOnScroll = true
      setTimeout(() => (this.isOnScroll = false), 500)
    }
  }
}
</script>

<style scoped lang="sass">
@import "../../utils/global.sass"

.s1
  height: 100vh
  width: 100%
  overflow: hidden
  z-index: 1

.s1-wrap
  position: relative
  height: 100%

.notificationPosition
  height: 400px
  position: absolute
  left: 50%
  top: 50%
  z-index: 3
  transform: translateX(-50%) translateY(-50%)


.marqueePosition
  height: 100%
  width: 100%

.marqueePosition2
  top: 0
  left: 0
  position: absolute
  z-index: 2
</style>
