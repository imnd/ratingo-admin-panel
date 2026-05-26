import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // If token is missing, redirect to login
  if (!authStore.token) {
    return navigateTo('/auth/login')
  }

  // If token exists but user state is null, fetch user details
  if (authStore.token && !authStore.user) {
    try {
      const api = useApi()
      const data = await api('/auth/me')
      authStore.user = data.user
      authStore.company = data.company
    } catch (err) {
      console.error('Failed to restore user session:', err)
      authStore.logout()
      return navigateTo('/auth/login')
    }
  }

  // If subscription has expired, force redirect to billing screen
  if (!authStore.isSubscriptionActive && to.path !== '/billing/expired') {
    return navigateTo('/billing/expired')
  }
})
