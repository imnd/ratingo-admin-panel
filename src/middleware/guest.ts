import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // Redirect to dashboard if user is logged in
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard/analytics')
  }
})
