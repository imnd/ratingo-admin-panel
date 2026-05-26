import { useRuntimeConfig, navigateTo } from '#app'

export const useApi = () => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  let apiBaseUrl = (runtimeConfig.public.apiBaseUrl as string) || 'http://localhost:8000/api/v1'
  if (typeof window !== 'undefined' && apiBaseUrl.includes('localhost') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    apiBaseUrl = apiBaseUrl.replace('localhost', window.location.hostname)
  }

  return $fetch.create({
    baseURL: apiBaseUrl,
    async onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
          Accept: 'application/json',
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 419 || response.status === 401) {
        authStore.logout()
        await navigateTo('/auth/login')
      }
      if (response.status === 403 && response._data?.error_code === 'SUBSCRIPTION_EXPIRED') {
        authStore.setSubscriptionStatus(false)
        await navigateTo('/billing/expired')
      }
    }
  })
}
