<template>
  <div :class="classname">
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
  </div>
</template>

<script>
export default {
  props: ['classname']
}
</script>

<style lang="sass">
.star
  position: absolute
  top: 50%
  left: 50%
  height: 2px
  background: linear-gradient(-45deg, #FFFFFF, rgba(0, 0, 255, 0))
  filter: drop-shadow(0 0 6px #FFFFFF)
  animation: tail 5000ms ease-in-out infinite,shooting 5s ease-in-out infinite
  &:before
    position: absolute
    content: ''
    top: calc(50% - 1px)
    right: 0
    height: 2px
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #FFFFFF, rgba(0, 0, 255, 0))
    border-radius: 100%
    transform: translateX(50%)
    animation: shining 3000ms ease-in-out infinite

.star:nth-child(1)
  top: 10%
  left: calc(50% - 300px)
  animation-delay: 650ms

.star:nth-child(1)::before, .star:nth-child(1)::after
  animation-delay: 650ms

.star:nth-child(2)
  top: 20%
  left: 10vw
  animation-delay: 150ms

.star:nth-child(2)::before, .star:nth-child(2)::after
  animation-delay: 150ms

.star:nth-child(3)
  top: 35%
  left: 20vw
  animation-delay: 1600ms

.star:nth-child(3)::before, .star:nth-child(3)::after
  animation-delay: 1600ms

.star:nth-child(4)
  top: 43%
  left: 25vw
  animation-delay: 4700ms

.star:nth-child(4)::before, .star:nth-child(4)::after
  animation-delay: 4700ms

.star:nth-child(5)
  top: 51%
  left: 30vw
  animation-delay: 2100ms

.star:nth-child(6)
  top: 51%
  left: 30vw
  animation-delay: 3100ms
.star:nth-child(7)
  top: 60%
  left: 30vw
  animation-delay: 5100ms
.star:nth-child(8)
  top: 73%
  left: 20vw
  animation-delay: 1100ms
.star:nth-child(9)
  top: 901%
  left: 10vw
  animation-delay: 2800ms

.star:nth-child(5)::before, .star:nth-child(5)::after
  animation-delay: 2100ms

@keyframes tail
  0%
    width: 0

  30%
    width: 300px

  100%
    width: 0

@keyframes shining
  0%
    width: 0

  50%
    width: 30px

  100%
    width: 0

@keyframes shooting
  0%
    transform: translateX(-50vw)

  100%
    transform: translateX(50vw)
</style>
