import { defineNuxtPlugin, addRouteMiddleware } from '#app'
import auth from '../middleware/auth'
import guest from '../middleware/guest'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', auth)
  addRouteMiddleware('guest', guest)
})
