<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="sass">
@import './utils/global.sass'
*
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #000000
  font-family: $fontFamily
  min-width: $xs
</style>
