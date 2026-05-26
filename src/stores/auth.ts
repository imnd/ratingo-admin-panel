import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: 'superadmin' | 'merchant'
}

interface Company {
  id: number
  name: string
  gstin: string | null
  is_subscription_active: boolean
  subscription_expires_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('auth_token', { maxAge: 60 * 60 * 24 * 7, path: '/' })
  const user = ref<User | null>(null)
  const company = ref<Company | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const isSubscriptionActive = computed(() => company.value?.is_subscription_active ?? false)

  function logout() {
    token.value = null
    user.value = null
    company.value = null
  }

  function setSubscriptionStatus(status: boolean) {
    if (company.value) company.value.is_subscription_active = status
  }

  return { token, user, company, isAuthenticated, isSubscriptionActive, logout, setSubscriptionStatus }
})
