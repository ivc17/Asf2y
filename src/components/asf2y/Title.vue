<template>
  <div class="wrap-titles">
    <div class="titles">
      <div class="titles-position">
        <Crt :data-text="mand" class="mand"></Crt>
        <Crt :data-text="eng"></Crt>
      </div>
    </div>
    <div class="bg">
      <img src="@/assets/olSun.svg" class="titleBg sun" />
      <img src="@/assets/olShut.svg" class="titleBg shut" />
      <img src="@/assets/olSea.svg" class="titleBg sea" />
    </div>
  </div>
</template>

<script lang="ts">
import Crt from './Crt.vue'

export default {
  name: 'Title',
  components: {
    Crt
  },
  mounted() {
    const id = setInterval(this.flicker, 2000)
    this.intervalId = id
  },
  beforeDestroy() {
    window.clearInterval(this.intervalId)
  },
  methods: {
    genReplacementE() {
      const arr = []
      const count = this.count
      let index = 0
      let set = null
      if (count === 0 || count === 1) {
        set = this.leet
        index = count
      } else {
        set = this.accent
        index = count - 2
      }
      for (let i of this.initE) {
        if (set && set[i]) {
          let c = set[i.toUpperCase()][index]
          arr.push(c ? c : 0)
        }
      }
      this.count = count < 3 ? count + 1 : 0
      this.eng = arr.concat('')
    },
    reset() {
      this.eng = this.initE
      this.mand = this.initM
    },
    genReplacementM() {
      this.mand = '沈睡了兩年之後我終於醒了，浮上了水面'
        .split('')
        .sort(function() {
          return 0.5 - Math.random()
        })
        .join('')
        .slice(0, 6)
    },
    flicker() {
      const id = setInterval(() => {
        this.genReplacementE()
        this.genReplacementM()
      }, 50)
      setTimeout(() => {
        clearInterval(id), this.reset()
      }, 400)
    }
  },
  data() {
    return {
      classObject: {
        static: false
      },
      initE: 'AfterSleepingFor2Years',
      initM: '沈睡了兩年之後',
      eng: 'AfterSleepingFor2Years',
      mand: '沈睡了兩年之後',
      intervalId: '',
      count: 0,
      leet: {
        A: [4, '@'],
        C: ['¢'],
        E: [3, '€'],
        F: ['|=', 'ph'],
        G: [6, 'C-'],
        H: ['#', '}{'],
        I: [1, '!'],
        L: ['el', '£'],
        N: ['/V', 'И'],
        O: [0, '<>'],
        P: ['|^(o)', '|°'],
        R: ['|~', '12'],
        S: [5, '$'],
        T: [7],
        X: ['×', '//'],
        Y: ['¥', 7]
      },
      accent: {
        A: ['Ă', 'Â', 'ă', 'â'],
        C: ['Ć', 'Č', 'č', 'ć'],
        D: ['đ', 'D'],
        E: ['Ê', 'ê'],
        O: ['Ô', 'Ơ', 'ô', 'ơ'],
        U: ['Ư', 'ư'],
        S: ['Š', 'š'],
        Z: ['Ž', 'ž']
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../utils/global.sass'
.wrap-titles
  overflow: hidden

.titles
  height: 100vh
  display: flex
  align-items: center
  justify-content: center

.titles-position
  transform: translateY(-50%)

.bg
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100%
  display: flex
  justify-content: space-between

.titleBg
  font-weight: 900
  font-size: 40rem
  text-stroke: 1px black
  -webkit-text-stroke: 1px black
  color: rgba(0, 0, 0, 0)
  height: 100%
  &.sun
    transform: rotate(180deg)

@media (max-width: $lg)
  .bg
    flex-direction: column
</style>
