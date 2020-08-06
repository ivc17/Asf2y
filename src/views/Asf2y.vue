<template>
  <div class="asf2y" ref="asf2y">
    <Title v-if="displays.title" ref="title"> </Title>
    <S1 ref="s1"> </S1>
    <S2> </S2>
    <!-- <S3></S3> -->
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import Title from '@/components/asf2y/Title.vue'
import S1 from '@/components/asf2y/s1.vue'
import S2 from '@/components/asf2y/s2.vue'
// import S3 from '@/components/asf2y/s3.vue'

export default {
  name: 'asf2y',
  components: {
    Title,
    S1,
    S2

    // S3
  },
  data: function() {
    return {
      displays: {
        title: true
      }
    }
  },
  methods: {
    getScrollDirection() {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop) {
        lastScrollTop = st <= 0 ? 0 : st
        return 'down'
      } else {
        lastScrollTop = st <= 0 ? 0 : st
        return 'up'
      }
    },
    onScroll() {
      let scrolled = window.pageYOffset
      if (
        scrolled > window.innerHeight / 10 &&
        scrolled < window.innerHeight / 2 &&
        this.getScrollDirection() === 'down'
      ) {
        this.toTarget('#s1')
      }
    },
    toTarget(target) {
      let toElement = document.querySelector(target)
      Velocity(toElement, 'scroll', {
        duration: 100,
        easing: 'ease-in'
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
let lastScrollTop = window.pageYOffset
</script>
<style scoped>
.asf2y {
  overflow: hidden;
}
.asf2y > section {
  width: 100%;
}
</style>
