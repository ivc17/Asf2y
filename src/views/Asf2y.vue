<template>
  <div class="asf2y" ref="asf2y">
    <section ref="sectionT">
      <Title v-if="findIsShow('title')"></Title>
    </section>
    <section ref="section1" id="s1">
      <S1 v-if="findIsShow('s1')"></S1>
    </section>
    <section>
      <S2 v-if="findIsShow('s2')"></S2>
    </section>
    <section>
      <S3 v-if="findIsShow('s3')"></S3>
    </section>
    <section>
      <S4 v-if="findIsShow('s4')"></S4>
    </section>
    <section>
      <S5 v-if="findIsShow('s5')"></S5>
    </section>
    <section>
      <S6 v-if="findIsShow('s6')"></S6>
    </section>
    <section>
      <S7 v-if="findIsShow('s7')"></S7>
    </section>
    <section>
      <S8 v-if="findIsShow('s8')"></S8>
    </section>
    <section>
      <S9 v-if="findIsShow('s9')"></S9>
    </section>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import Title from '@/components/asf2y/Title.vue'
import S1 from '@/components/asf2y/s1.vue'
import S2 from '@/components/asf2y/s2.vue'
import S3 from '@/components/asf2y/s3.vue'
import S4 from '@/components/asf2y/s4.vue'
import S5 from '@/components/asf2y/s5.vue'
import S6 from '@/components/asf2y/s6.vue'
import S7 from '@/components/asf2y/s7.vue'
import S8 from '@/components/asf2y/s8.vue'
import S9 from '@/components/asf2y/s9.vue'

export default {
  name: 'asf2y',
  components: {
    Title,
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    S8,
    S9
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  data: function() {
    return {
      screens: ['title', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'],
      current: ['title', 's1']
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
      const idx = Math.floor(window.scrollY / window.innerHeight)

      if (idx === 0) {
        this.current = this.screens.slice(0, 2)
      } else {
        this.current = this.screens.slice(idx, idx + 2)
      }
    },
    toTarget(target) {
      let toElement = document.querySelector(target)
      Velocity(toElement, 'scroll', {
        duration: 100,
        easing: 'ease-in'
      })
    },
    findIsShow: function(key) {
      return !!this.current.find(i => i === key)
    }
  }
}
let lastScrollTop = window.pageYOffset
</script>
<style scoped lang="sass">
@import '@/utils/global.sass'
.asf2y
  overflow: hidden
  min-width: $xs
  &>section
    height: 100vh
    &>div
      width: 100%
      height: 100%
</style>
