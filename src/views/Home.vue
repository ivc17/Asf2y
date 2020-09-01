<template>
  <div class="home">
    <router-link to="/AfterSleepigFor2Years" class="homeLink">
      <p class="instruction">
        Please scroll through it slowly
        <br />as if you are reading a book
        <br />
        <br />適合像看書一樣慢慢滑
      </p>
      <router-link class="forward" to="/afterSleepigFor2Years"> </router-link>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
  background-color: transparent
  border: none
  display: flex
  width: 100px
  height: 100px
  display: block
  cursor: pointer
  background-image: url('../assets/forward.svg')
  background-repeat: no-repeat
  background-size: 100px 100px

@media (max-width: $sm)
  .home
    padding: 1rem
  .homeLink
    p
      margin-right: 2rem
</style>
