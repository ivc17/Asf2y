import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/afterSleepigFor2Years',
    name: 'AfterSleepigFor2Years',
    component: () =>
      import(/* webpackChunkName: "asf2y" */ '../views/Asf2y.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
