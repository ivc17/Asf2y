<template>
  <div class="home">
    <Control link="https://ivc17.github.io" :isExternal="true" :stable="true" />
    <router-link to="/AfterSleepigFor2Years" class="homeLink">
      <p class="instruction">
        Please scroll through it slowly
        <br />as if you are reading a book
        <br />
        <br />適合像看書一樣慢慢滑
      </p>
      <router-link class="forward" to="/afterSleepigFor2Years"></router-link>
    </router-link>
  </div>
</template>

<script>
import Control from '@/components/Control.vue'
export default {
  name: 'Home',
  components: { Control }
}
</script>

<style lang="sass">
@import '@/utils/global.sass'

.home
  display: flex
  align-items: center
  height: 100vh
  width: 100%
  padding: 4rem

.homeLink
  cursor: pointer
  display: flex
  align-items: center
  font-weight: 600
  font-size: 1.5rem
  color: #000000
  text-decoration: none
  text-align: left
  p
    margin-right: 4rem
    &.instruction
      font-size: 1rem

.forward
  width: 100px
  height: 100px
  display: block
  cursor: pointer
  background-image: url('../assets/icons/forwardIcon.svg')
  background-repeat: no-repeat
  background-size: 100px 100px

@media (max-width: $sm)
  .home
    padding: 1rem
  .homeLink
    p
      margin-right: 2rem
</style>
