<template>
  <div class="home">
    <div class="info">
      <p>Ivy Chang</p>
      <p>0908269169</p>
      <p>ivychang147@gmail.com</p>
      <p>https://github.com/ivc17/Asf2y</p>
    </div>
    <router-link to="/AfterSleepigFor2Years" class="homeLink">
      <img src="@/assets/coverImg.png" />
      <p>AfterSleepigFor2Years</p>
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

.info
  font-weight: 900
  font-size: 7rem
  text-align: left
  margin: 2rem 4rem
  p
    margin: 1rem 0
    &:nth-child(2)
      font-size: 3rem
    &:nth-child(3)
      font-size: 2rem
    &:nth-child(4)
      font-size: 1.5rem

.homeLink
  display: block
  font-weight: 300
  font-size: 1.5rem
  color: #000000
  text-decoration: none
  text-align: left
  p
    margin: 1rem 4rem
    margin-bottom: 3rem
  img
    height: 300px
    width: 500px
    object-fit: cover
    margin: 2rem 4rem

@media (max-width: $lg)
  .home
    flex-direction: column
</style>
