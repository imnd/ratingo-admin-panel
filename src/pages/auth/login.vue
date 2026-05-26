<template>
  <div>
    <!-- Session notification alerts -->
    <div v-if="errorMessage" class="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
      <AlertTriangleIcon class="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label for="email" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
        <div class="relative">
          <MailIcon class="absolute left-3 top-3 w-5 h-5 text-slate-500" />
          <input
            v-model="email"
            id="email"
            type="email"
            required
            placeholder="name@company.com"
            class="w-full bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 focus:border-brand-500 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            :disabled="loading"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
        <div class="relative">
          <LockIcon class="absolute left-3 top-3 w-5 h-5 text-slate-500" />
          <input
            v-model="password"
            id="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 focus:border-brand-500 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            :disabled="loading"
          />
        </div>
      </div>

      <!-- Actions -->
      <button
        type="submit"
        class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
        <span v-else>Log In</span>
      </button>
    </form>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MailIcon, LockIcon, AlertTriangleIcon } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useNotificationsStore } from '~/stores/notifications'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')


const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const api = useApi()
    const response = await api('/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    // Store in cookie and auth state
    authStore.token = response.token
    authStore.user = response.user
    authStore.company = response.company

    notificationsStore.success(`Welcome back, ${response.user.name}!`)
    await router.push('/analytics')
  } catch (err) {
    console.error('Login error:', err)
    errorMessage.value = err.data?.message || 'Invalid email or password'
    notificationsStore.error('Authentication failed')
  } finally {
    loading.value = false
  }
}
</script>
