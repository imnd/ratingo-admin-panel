<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Page Header & Period Selector -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Analytics Dashboard</h1>
        <p class="text-sm text-slate-400 mt-1">Real-time scan conversions and feedback redirection statistics</p>
      </div>

      <!-- Date Period Switcher -->
      <div class="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="setPeriod(period.value)"
          class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
          :class="currentPeriod === period.value ? 'bg-brand-600 text-white shadow shadow-brand-500/20' : 'text-slate-400 hover:text-slate-200'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Empty State (No Locations) -->
    <div v-if="!locationsStore.loading && locationsStore.locations.length === 0" class="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-slate-800 text-center min-h-[350px]">
      <div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50 text-slate-400 mb-4">
        <MapPinOffIcon class="w-8 h-8" />
      </div>
      <h3 class="text-lg font-bold text-slate-200">No Locations Found</h3>
      <p class="text-sm text-slate-400 max-w-sm mt-2 mb-6">
        You haven't added any locations to your merchant account yet. Please add a business location to start tracking scans.
      </p>
      <button
        @click="addFirstLocation"
        class="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-xs font-semibold shadow shadow-brand-500/20 text-white"
      >
        <PlusIcon class="w-4 h-4" />
        <span>+ Add First Location</span>
      </button>
    </div>

    <!-- Main Dashboard Metrics -->
    <div v-else class="space-y-8">
      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total QR Scans"
          :value="metrics.totalScans"
          :icon="QrCodeIcon"
          :loading="loading"
          :change="metrics.scansChange"
        />
        <MetricCard
          title="Positive Redirects"
          :value="metrics.positiveRedirects"
          :icon="CheckSquareIcon"
          :loading="loading"
          :change="metrics.redirectsChange"
        />
        <MetricCard
          title="Negative Intercepted"
          :value="metrics.negativeIntercepts"
          :icon="ShieldAlertIcon"
          :loading="loading"
          :change="metrics.interceptsChange"
        />
      </div>

      <!-- Trend Chart -->
      <SummaryChart
        :chart-data="chartData"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import {
  QrCodeIcon,
  CheckSquareIcon,
  ShieldAlertIcon,
  MapPinOffIcon,
  PlusIcon
} from 'lucide-vue-next'
import { useLocationsStore } from '~/stores/locations'
import { useNotificationsStore } from '~/stores/notifications'
import MetricCard from '../components/MetricCard.vue'
import SummaryChart from '../components/SummaryChart.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const locationsStore = useLocationsStore()
const notificationsStore = useNotificationsStore()

const loading = ref(true)
const currentPeriod = ref('7d')
const periods = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' }
]

// KPI Metrics State
const metrics = ref({
  totalScans: 0,
  scansChange: 0,
  positiveRedirects: 0,
  redirectsChange: 0,
  negativeIntercepts: 0,
  interceptsChange: 0
})

// Chart Data State
const chartData = ref({
  labels: [],
  positiveRedirects: [],
  negativeIntercepts: []
})

// Set Date Filter Period
const setPeriod = async (val) => {
  currentPeriod.value = val
  await loadAnalytics()
}

// Simulated action for adding a location
const addFirstLocation = () => {
  notificationsStore.info('Redirecting to location creation form (Mock)')
}

// Fetch analytics from API
const loadAnalytics = async () => {
  // If there are no locations yet, skip fetching analytics
  if (locationsStore.locations.length === 0 && !locationsStore.loading) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const api = useApi()
    const data = await api('/analytics', {
      query: {
        locationId: locationsStore.currentLocationId,
        period: currentPeriod.value
      }
    })

    metrics.value = data.metrics
    chartData.value = data.chartData
  } catch (err) {
    console.error('Failed to load analytics:', err)
    notificationsStore.error('Could not load analytics. Please try again.')
  } finally {
    loading.value = false
  }
}

// Watch location context changes
watch(() => locationsStore.currentLocationId, async () => {
  await loadAnalytics()
})

// Init page
onMounted(async () => {
  // Ensure locations are loaded before running analysis
  if (locationsStore.locations.length === 0) {
    await locationsStore.fetchLocations()
  }
  await loadAnalytics()
})
</script>
