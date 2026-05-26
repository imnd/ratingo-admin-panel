<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 bg-[#030712] overflow-hidden">
    <!-- Red ambient glow in background -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[128px]"></div>

    <!-- Center Card -->
    <div class="w-full max-w-md glass-panel rounded-2xl shadow-glass-lg p-8 relative z-10 border border-red-500/20 text-center">
      <!-- Icon -->
      <div class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mx-auto mb-6 text-red-500 animate-pulse">
        <CreditCardIcon class="w-8 h-8" />
      </div>

      <h1 class="text-2xl font-bold text-slate-100 mb-2">Subscription Expired</h1>
      <p class="text-slate-400 text-sm mb-6 leading-relaxed">
        Your merchant subscription has expired. Please renew your plan to reactivate location synchronization, reviews monitoring, and analytical dashboards.
      </p>

      <!-- Account Info Box -->
      <div class="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-4 mb-6 text-left">
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-slate-500">Merchant Account:</span>
          <span class="text-slate-300 font-medium">{{ user?.email }}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-slate-500">Company ID:</span>
          <span class="text-slate-300 font-medium font-mono">#{{ company?.id }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          @click="reactivateSubscription"
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all text-white flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
          <span v-else>Renew & Activate Plan (Demo)</span>
        </button>

        <button
          @click="handleLogout"
          class="w-full py-2 px-4 rounded-xl border border-slate-800 hover:bg-slate-800/40 transition-all text-xs text-slate-400 font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CreditCardIcon } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useNotificationsStore } from '~/stores/notifications'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const user = computed(() => authStore.user)
const company = computed(() => authStore.company)
const loading = ref(false)

const reactivateSubscription = async () => {
  loading.value = true
  try {
    const api = useApi()
    // Simulated checkout endpoint
    await api('/billing/reactivate', { method: 'POST' })
    
    // Toggle state in Pinia
    authStore.setSubscriptionStatus(true)
    
    notificationsStore.success('Demo payment successful! Subscription reactivated.')
    await router.push('/analytics')
  } catch (err) {
    console.error('Failed to renew subscription:', err)
    notificationsStore.error('Checkout failed. Please try again.')
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  authStore.logout()
  notificationsStore.success('Logged out successfully')
  await router.push('/auth/login')
}
</script>
