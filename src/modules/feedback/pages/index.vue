<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Header Area -->
    <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Feedback Interceptor Logs</h1>
        <p class="text-sm text-slate-400 mt-1">Manage and respond to critical 1–3 star ratings captured from customer scans</p>
      </div>

      <!-- Filters Block -->
      <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <!-- Local Location Select Dropdown -->
        <div class="relative min-w-[180px]">
          <select
            v-model="feedbackStore.filters.location_id"
            class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500/50 appearance-none pr-8 cursor-pointer font-semibold"
          >
            <option :value="null">All Locations</option>
            <option v-for="loc in locationsStore.locations" :key="loc.id" :value="loc.id">
              {{ loc.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
            <ChevronDownIcon class="w-3.5 h-3.5" />
          </div>
        </div>

        <!-- Date Range Pickers (From / To) -->
        <div class="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5">
          <input
            v-model="feedbackStore.filters.date_from"
            type="date"
            class="bg-transparent border-0 text-xs text-slate-200 focus:outline-none cursor-pointer focus:ring-0 w-28 uppercase"
            placeholder="From Date"
          />
          <span class="text-slate-600 text-xs font-semibold">to</span>
          <input
            v-model="feedbackStore.filters.date_to"
            type="date"
            class="bg-transparent border-0 text-xs text-slate-200 focus:outline-none cursor-pointer focus:ring-0 w-28 uppercase"
            placeholder="To Date"
          />
        </div>

        <!-- Search input -->
        <div class="relative min-w-[200px] flex-grow sm:flex-grow-0">
          <SearchIcon class="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search details..."
            class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <!-- Empty State (No Locations configured) -->
    <div v-if="!locationsStore.loading && locationsStore.locations.length === 0" class="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-slate-800 text-center min-h-[350px]">
      <div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50 text-slate-400 mb-4">
        <MapPinOffIcon class="w-8 h-8" />
      </div>
      <h3 class="text-lg font-bold text-slate-200">No Locations Found</h3>
      <p class="text-sm text-slate-400 max-w-sm mt-2 mb-6">
        Please configure a location in your merchant profile first.
      </p>
      <button
        @click="addFirstLocation"
        class="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-xs font-semibold shadow shadow-brand-500/20 text-white"
      >
        <PlusIcon class="w-4 h-4" />
        <span>+ Add First Location</span>
      </button>
    </div>

    <!-- Table content section -->
    <div v-else class="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-glass-sm bg-slate-900/10">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800/80 bg-slate-900/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th class="px-6 py-4">Date & Time</th>
              <th class="px-6 py-4">Location</th>
              <th class="px-6 py-4">Rating</th>
              <th class="px-6 py-4">Customer Info</th>
              <th class="px-6 py-4">Comment Summary</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody class="divide-y divide-slate-800/60">
            <!-- Loading Skeleton Rows -->
            <tr v-if="feedbackStore.loading" v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse">
              <td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-24"></div></td>
              <td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-28"></div></td>
              <td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-16"></div></td>
              <td class="px-6 py-5">
                <div class="h-4 bg-slate-800/60 rounded w-24 mb-1.5"></div>
                <div class="h-3 bg-slate-800/60 rounded w-32"></div>
              </td>
              <td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-full"></div></td>
              <td class="px-6 py-5 text-right"><div class="h-7 bg-slate-800/60 rounded w-16 ml-auto"></div></td>
            </tr>

            <!-- Empty Row Data State -->
            <tr v-else-if="feedbackStore.feedbacks.length === 0">
              <td colspan="6" class="px-6 py-16 text-center">
                <div class="max-w-md mx-auto flex flex-col items-center">
                  <InboxIcon class="w-12 h-12 text-slate-700 mb-3" />
                  <p class="text-sm font-semibold text-slate-300">No intercept logs found</p>
                  <p class="text-xs text-slate-500 mt-1">
                    No negative feedback found for this location in the selected date range.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Rendered feedback row data -->
            <FeedbackRow
              v-else
              v-for="item in feedbackStore.feedbacks"
              :key="item.id"
              :feedback="item"
              @view="openDetails"
            />
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="feedbackStore.pagination.totalPages > 1" class="px-6 py-4 bg-slate-900/20 border-t border-slate-800/80 flex items-center justify-between gap-4">
        <!-- Results Counter -->
        <span class="text-xs text-slate-500 font-medium">
          Showing page {{ feedbackStore.pagination.page }} of {{ feedbackStore.pagination.totalPages }} (Total {{ feedbackStore.pagination.total }} entries)
        </span>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-1">
          <!-- Prev Button -->
          <button
            @click="setPage(feedbackStore.pagination.page - 1)"
            :disabled="feedbackStore.pagination.page === 1"
            class="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>

          <!-- Pages -->
          <button
            v-for="page in visiblePages"
            :key="`page-${page}`"
            @click="setPage(page)"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            :class="feedbackStore.pagination.page === page ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'"
          >
            {{ page }}
          </button>

          <!-- Next Button -->
          <button
            @click="setPage(feedbackStore.pagination.page + 1)"
            :disabled="feedbackStore.pagination.page === feedbackStore.pagination.totalPages"
            class="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Feedback Details Modal View -->
    <FeedbackModal
      :feedback="activeFeedback"
      :is-open="modalOpen"
      @close="closeDetails"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  InboxIcon,
  MapPinOffIcon,
  PlusIcon
} from 'lucide-vue-next'
import { useLocationsStore } from '~/stores/locations'
import { useNotificationsStore } from '~/stores/notifications'
import { useFeedbackStore } from '~/stores/feedback'
import FeedbackRow from '../components/FeedbackRow.vue'
import FeedbackModal from '../components/FeedbackModal.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const locationsStore = useLocationsStore()
const notificationsStore = useNotificationsStore()
const feedbackStore = useFeedbackStore()

const searchQuery = ref('')

// Modal State
const modalOpen = ref(false)
const activeFeedback = ref({})

// Mock add first location click
const addFirstLocation = () => {
  notificationsStore.info('Opening location creation form')
}

// Page select handler
const setPage = async (page) => {
  if (page < 1 || page > feedbackStore.pagination.totalPages) return
  feedbackStore.setPage(page)
  await feedbackStore.fetchFeedbacks()
}

// Input search trigger
let searchTimeout = null
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    feedbackStore.filters.search = searchQuery.value
    feedbackStore.pagination.page = 1
    await feedbackStore.fetchFeedbacks()
  }, 400) // debounce
}

// Compute visible pages array (up to 5 pages around active page)
const visiblePages = computed(() => {
  const range = []
  const maxPages = 5
  const currentPage = feedbackStore.pagination.page
  const totalPages = feedbackStore.pagination.totalPages
  let start = Math.max(1, currentPage - Math.floor(maxPages / 2))
  let end = Math.min(totalPages, start + maxPages - 1)

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

// Modal controls
const openDetails = (feedback) => {
  activeFeedback.value = feedback
  modalOpen.value = true
}

const closeDetails = () => {
  modalOpen.value = false
}

// Sync global location selector with local feedback filters
watch(
  () => locationsStore.currentLocationId,
  (newId) => {
    feedbackStore.filters.location_id = newId
    feedbackStore.pagination.page = 1
    feedbackStore.fetchFeedbacks()
  },
  { immediate: true }
)

// Watch local filters (location dropdown, date range)
watch(
  () => [feedbackStore.filters.location_id, feedbackStore.filters.date_from, feedbackStore.filters.date_to],
  async () => {
    feedbackStore.pagination.page = 1
    await feedbackStore.fetchFeedbacks()
  }
)

onMounted(async () => {
  if (locationsStore.locations.length === 0) {
    await locationsStore.fetchLocations()
  }
  await feedbackStore.fetchFeedbacks()
})
</script>
