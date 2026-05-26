<template>
  <div class="min-h-screen flex bg-[#03060f] text-slate-100 relative overflow-hidden">
    <!-- Mobile Sidebar Backdrop Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
    ></div>

    <!-- Sidebar Navigation -->
    <aside
      class="fixed md:static inset-y-0 left-0 w-64 border-r border-slate-800/80 bg-[#070b19]/90 backdrop-blur-xl flex flex-col justify-between flex-shrink-0 z-40 transition-transform duration-250 ease-in-out md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div>
        <!-- Brand Header -->
        <div class="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-lg flex items-center justify-center shadow shadow-brand-500/30">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 class="font-bold tracking-wide text-sm bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">RATINGO</h2>
              <p class="text-[10px] text-brand-400 font-semibold tracking-wider uppercase leading-none">Merchant Hub</p>
            </div>
          </div>

          <!-- Mobile Sidebar Close Button -->
          <button @click="isSidebarOpen = false" class="md:hidden text-slate-400 hover:text-slate-200">
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1.5">
          <NuxtLink
            to="/analytics"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-300 hover:text-slate-100 hover:bg-slate-800/40"
            active-class="bg-brand-500/10 border border-brand-500/20 !text-brand-400 font-medium"
            @click="isSidebarOpen = false"
          >
            <BarChart3Icon class="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
            <span class="text-sm">Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/feedback"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-300 hover:text-slate-100 hover:bg-slate-800/40"
            active-class="bg-brand-500/10 border border-brand-500/20 !text-brand-400 font-medium"
            @click="isSidebarOpen = false"
          >
            <MessageSquareWarningIcon class="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
            <span class="text-sm">Feedback Logs</span>
          </NuxtLink>

          <!-- Locations Management Button -->
          <button
            @click="openLocationsModal"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-slate-300 hover:text-slate-100 hover:bg-slate-800/40"
          >
            <SettingsIcon class="w-5 h-5" />
            <span class="text-sm">Manage Locations</span>
          </button>
        </nav>
      </div>

      <!-- Footer Company Info / Profile -->
      <div class="p-4 border-t border-slate-800/80 bg-[#050813]">
        <div v-if="company" class="mb-4 px-2">
          <p class="text-xs text-slate-400">Company</p>
          <p class="text-sm font-semibold truncate text-slate-200">{{ company.name }}</p>
          <span
            class="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
            :class="company.is_subscription_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
          >
            {{ company.is_subscription_active ? 'Active Plan' : 'Expired' }}
          </span>
        </div>

        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-800 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all text-xs text-slate-400"
        >
          <LogOutIcon class="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-grow flex flex-col min-w-0 min-h-screen overflow-y-auto">
      <!-- Header -->
      <header class="h-16 border-b border-slate-800/80 bg-[#070b19]/60 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
        <!-- Breadcrumbs or section description -->
        <div class="flex items-center gap-3">
          <!-- Mobile Burger Menu Trigger -->
          <button @click="isSidebarOpen = true" class="md:hidden text-slate-300 hover:text-white mr-1">
            <MenuIcon class="w-6 h-6" />
          </button>
          
          <span class="text-sm text-slate-400 font-medium hidden sm:inline">Reputation Portal</span>
          <ChevronRightIcon class="w-4 h-4 text-slate-600 hidden sm:inline" />
          <span class="text-sm font-semibold text-slate-200 capitalize">{{ routeName }}</span>
        </div>

        <!-- Global Filters / Selector & Profile Info -->
        <div class="flex items-center gap-4 md:gap-6">
          <!-- Active Location Selector Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-2.5 px-3 py-2 md:px-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 hover:border-slate-600 transition-all text-xs font-semibold"
            >
              <MapPinIcon class="w-4 h-4 text-brand-400" />
              <span class="max-w-[120px] md:max-w-xs truncate">Location: {{ currentLocationName }}</span>
              <ChevronDownIcon class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
            </button>

            <!-- Dropdown Body -->
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="isOpen"
                class="absolute right-0 mt-2 w-64 rounded-xl shadow-glass-lg border border-slate-700/80 glass-dropdown z-40 py-1"
              >
                <!-- Quick Inline Text Search (only if > 5 locations) -->
                <div v-if="locationsStore.locations.length > 5" class="p-2 border-b border-slate-800/80">
                  <div class="relative">
                    <SearchIcon class="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Search location..."
                      class="w-full bg-[#03060f] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"
                      @click.stop
                    />
                  </div>
                </div>

                <!-- Locations List -->
                <div class="max-h-60 overflow-y-auto">
                  <button
                    @click="selectLocation(null)"
                    class="w-full text-left px-4 py-2.5 text-xs hover:bg-brand-500/10 hover:text-brand-400 transition-colors flex items-center justify-between"
                    :class="{ 'text-brand-400 bg-brand-500/5 font-semibold': locationsStore.currentLocationId === null }"
                  >
                    <span>All Locations</span>
                    <CheckIcon v-if="locationsStore.currentLocationId === null" class="w-3.5 h-3.5 text-brand-400" />
                  </button>

                  <div v-if="filteredLocations.length === 0" class="px-4 py-3 text-center text-xs text-slate-500">
                    No locations match search
                  </div>

                  <button
                    v-for="loc in filteredLocations"
                    :key="loc.id"
                    @click="selectLocation(loc.id)"
                    class="w-full text-left px-4 py-2.5 text-xs hover:bg-brand-500/10 hover:text-brand-400 transition-colors flex items-center justify-between"
                    :class="{ 'text-brand-400 bg-brand-500/5 font-semibold': locationsStore.currentLocationId === loc.id }"
                  >
                    <div class="truncate pr-2">
                      <p class="font-medium text-slate-200 truncate">{{ loc.name }}</p>
                    </div>
                    <CheckIcon v-if="locationsStore.currentLocationId === loc.id" class="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- User Details / Role -->
          <div v-if="user" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-xs font-semibold text-brand-300">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div class="hidden md:block">
              <p class="text-xs font-semibold text-slate-200 leading-none">{{ user.name }}</p>
              <p class="text-[10px] text-slate-500 capitalize leading-none mt-0.5">{{ user.role }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-grow p-4 md:p-8 bg-[#03060f]">
        <slot />
      </main>
    </div>

    <!-- ============================================== -->
    <!-- MODAL: LOCATIONS MANAGEMENT PANEL              -->
    <!-- ============================================== -->
    <Transition name="modal-fade">
      <div
        v-if="locationsModalOpen"
        class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        @click.self="closeLocationsModal"
      >
        <div class="w-full max-w-4xl rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0">
            <div class="flex items-center gap-2">
              <MapPinIcon class="w-5 h-5 text-brand-400" />
              <h3 class="text-base font-bold text-slate-200">Manage Locations</h3>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="openAddLocation"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow transition-all"
              >
                <PlusIcon class="w-3.5 h-3.5" />
                <span>Add Location</span>
              </button>
              <button @click="closeLocationsModal" class="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800/60 rounded-lg">
                <XIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Content (Scrollable list of locations) -->
          <div class="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-950/40">
            <!-- Loading Indicator -->
            <div v-if="locationsStore.loading" class="space-y-4">
              <div v-for="i in 3" :key="`loc-skeleton-${i}`" class="animate-pulse glass-panel rounded-xl p-4 border border-slate-800/80 h-24"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="locationsStore.locations.length === 0" class="text-center py-12">
              <MapPinIcon class="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p class="text-sm font-semibold text-slate-300">No locations configured yet</p>
              <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Configure your restaurant branches to start generating QR codes and capturing feedback.</p>
            </div>

            <!-- Grid of Cards -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="loc in locationsStore.locations"
                :key="loc.id"
                class="glass-panel border rounded-xl p-4 flex flex-col justify-between transition-all hover:border-slate-700/60"
                :class="loc.is_active ? 'border-slate-800/80' : 'border-slate-900 opacity-60'"
              >
                <div>
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <h4 class="font-bold text-slate-200 text-sm truncate">{{ loc.name }}</h4>
                    <span
                      class="px-2 py-0.5 rounded-full text-[9px] font-semibold border"
                      :class="loc.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700/50'"
                    >
                      {{ loc.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>

                  <!-- Links -->
                  <div class="space-y-1 text-xs text-slate-400 mb-4">
                    <div class="flex items-center gap-1.5 truncate">
                      <span class="text-slate-500 text-[10px] w-12 font-medium uppercase">Google:</span>
                      <a :href="loc.google_maps_url" target="_blank" class="text-brand-400 hover:underline truncate flex items-center gap-0.5">
                        <span>View on Maps</span>
                        <ExternalLinkIcon class="w-3 h-3" />
                      </a>
                    </div>
                    <div v-if="loc.justdial_url" class="flex items-center gap-1.5 truncate">
                      <span class="text-slate-500 text-[10px] w-12 font-medium uppercase">Justdial:</span>
                      <a :href="loc.justdial_url" target="_blank" class="text-brand-400 hover:underline truncate flex items-center gap-0.5">
                        <span>View Justdial</span>
                        <ExternalLinkIcon class="w-3 h-3" />
                      </a>
                    </div>
                    <div class="flex items-center gap-1.5" v-if="loc.qr_code">
                      <span class="text-slate-500 text-[10px] w-12 font-medium uppercase">Scans:</span>
                      <span class="text-slate-200 font-semibold">{{ loc.qr_code.scan_count }} scans</span>
                    </div>
                  </div>
                </div>

                <!-- Action Bar -->
                <div class="flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-auto">
                  <button
                    @click="openQrModal(loc)"
                    class="flex-grow inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 text-brand-400 text-xs font-semibold transition-all"
                  >
                    <QrCodeIcon class="w-3.5 h-3.5" />
                    <span>Get QR Code</span>
                  </button>
                  <button
                    @click="openEditLocation(loc)"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all"
                  >
                    <EditIcon class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ============================================== -->
    <!-- MODAL: ADD / EDIT LOCATION FORM                -->
    <!-- ============================================== -->
    <Transition name="modal-fade">
      <div
        v-if="addEditModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        @click.self="addEditModalOpen = false"
      >
        <div class="w-full max-w-md rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up">
          <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-200">
              {{ isEditMode ? 'Edit Location' : 'Add New Location' }}
            </h3>
            <button @click="addEditModalOpen = false" class="text-slate-400 hover:text-slate-200">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="submitLocationForm" class="p-6 space-y-4">
            <div>
              <label for="loc-name" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Location Name</label>
              <input
                v-model="locationForm.name"
                id="loc-name"
                type="text"
                required
                placeholder="e.g. Connaught Place Branch"
                class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label for="loc-gmaps" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Google Maps URL</label>
              <input
                v-model="locationForm.google_maps_url"
                id="loc-gmaps"
                type="url"
                required
                placeholder="https://maps.google.com/?cid=..."
                class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label for="loc-jd" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Justdial URL (Optional)</label>
              <input
                v-model="locationForm.justdial_url"
                id="loc-jd"
                type="url"
                placeholder="https://www.justdial.com/..."
                class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div v-if="isEditMode" class="flex items-center gap-2 pt-2">
              <input
                v-model="locationForm.is_active"
                id="loc-active"
                type="checkbox"
                class="rounded border-slate-800 text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900"
              />
              <label for="loc-active" class="text-sm text-slate-300 font-medium cursor-pointer">Active and open for scans</label>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/80 mt-6">
              <button
                type="button"
                @click="addEditModalOpen = false"
                class="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition-all shadow"
                :disabled="formSubmitting"
              >
                <span v-if="formSubmitting" class="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-1 inline-block"></span>
                <span>{{ isEditMode ? 'Save Changes' : 'Create Location' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ============================================== -->
    <!-- MODAL: QR CODE DISPLAY & DOWNLOAD              -->
    <!-- ============================================== -->
    <Transition name="modal-fade">
      <div
        v-if="qrModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        @click.self="qrModalOpen = false"
      >
        <div v-if="activeQrLocation" class="w-full max-w-sm rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up text-center">
          <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-200 text-left truncate">QR Code: {{ activeQrLocation.name }}</h3>
            <button @click="qrModalOpen = false" class="text-slate-400 hover:text-slate-200">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="p-6 flex flex-col items-center">
            <p class="text-xs text-slate-400 mb-4">Scan this QR code with a mobile device to rate the branch and provide feedback.</p>
            
            <div class="flex flex-col items-center justify-center p-6 bg-white rounded-2xl mb-4 border border-slate-800 shadow-lg">
              <!-- Visible canvas component for PNG generation -->
              <QrcodeVue id="qr-canvas" :value="qrCodeUrl" :size="200" level="H" render-as="canvas" />
              <!-- Hidden SVG component for SVG generation -->
              <QrcodeVue id="qr-svg" :value="qrCodeUrl" :size="200" level="H" render-as="svg" class="hidden" />
            </div>

            <div class="w-full text-xs text-slate-500 font-mono select-all bg-slate-950/80 border border-slate-850 p-2.5 rounded-xl break-all mb-6">
              {{ qrCodeUrl }}
            </div>

            <div class="grid grid-cols-2 gap-3 w-full">
              <button
                @click="downloadPNG"
                class="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 text-brand-400 text-xs font-semibold transition-all"
              >
                <DownloadIcon class="w-4 h-4" />
                <span>PNG</span>
              </button>
              <button
                @click="downloadSVG"
                class="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all"
              >
                <DownloadIcon class="w-4 h-4" />
                <span>SVG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BarChart3Icon,
  MessageSquareWarningIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MapPinIcon,
  SearchIcon,
  CheckIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  EditIcon,
  ExternalLinkIcon,
  QrCodeIcon,
  DownloadIcon,
  SettingsIcon
} from 'lucide-vue-next'
import QrcodeVue from 'qrcode.vue'
import { useAuthStore } from '~/stores/auth'
import { useLocationsStore } from '~/stores/locations'
import { useNotificationsStore } from '~/stores/notifications'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const locationsStore = useLocationsStore()
const notificationsStore = useNotificationsStore()

const user = computed(() => authStore.user)
const company = computed(() => authStore.company)

// Sidebar Responsive State
const isSidebarOpen = ref(false)

// Locations modal state
const locationsModalOpen = ref(false)
const addEditModalOpen = ref(false)
const isEditMode = ref(false)
const formSubmitting = ref(false)
const locationForm = ref({ id: null, name: '', google_maps_url: '', justdial_url: '', is_active: true })

// QR modal state
const qrModalOpen = ref(false)
const activeQrLocation = ref(null)

const qrCodeUrl = computed(() => {
  if (!activeQrLocation.value) return ''
  const uuid = activeQrLocation.value.qr_code?.uuid || activeQrLocation.value.uuid
  if (typeof window !== 'undefined' && window.location.port) {
    return `${window.location.protocol}//${window.location.hostname}:5173/r/${uuid}`
  }
  return `https://app.domain.in/r/${uuid}`
})

// Compute current path name for breadcrumbs
const routeName = computed(() => {
  const path = route.path
  if (path.includes('analytics')) return 'analytics dashboard'
  if (path.includes('feedback')) return 'feedback logs'
  return path.substring(1) || 'home'
})

// Dropdown State
const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

// Filter locations inside dropdown
const filteredLocations = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return locationsStore.locations
  return locationsStore.locations.filter(loc =>
    loc.name.toLowerCase().includes(query)
  )
})

// Display currently selected location name
const currentLocationName = computed(() => {
  if (locationsStore.currentLocationId === null) return 'All Locations'
  return locationsStore.currentLocation?.name || 'All Locations'
})

const selectLocation = (id) => {
  locationsStore.setCurrentLocationId(id)
  isOpen.value = false
  notificationsStore.info(`Location filter set to: ${currentLocationName.value}`)
}

// Logout handler
const handleLogout = async () => {
  authStore.logout()
  notificationsStore.success('Logged out successfully')
  await router.push('/auth/login')
}

// Click outside handling for dropdown
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Locations Modal Handlers
const openLocationsModal = () => {
  locationsModalOpen.value = true
  isSidebarOpen.value = false
}
const closeLocationsModal = () => {
  locationsModalOpen.value = false
}

const openAddLocation = () => {
  isEditMode.value = false
  locationForm.value = { id: null, name: '', google_maps_url: '', justdial_url: '', is_active: true }
  addEditModalOpen.value = true
}

const openEditLocation = (loc) => {
  isEditMode.value = true
  locationForm.value = {
    id: loc.id,
    name: loc.name,
    google_maps_url: loc.google_maps_url,
    justdial_url: loc.justdial_url || '',
    is_active: loc.is_active
  }
  addEditModalOpen.value = true
}

const submitLocationForm = async () => {
  formSubmitting.value = true
  try {
    const payload = {
      name: locationForm.value.name,
      google_maps_url: locationForm.value.google_maps_url,
      justdial_url: locationForm.value.justdial_url || null,
      is_active: locationForm.value.is_active
    }
    
    if (isEditMode.value) {
      await locationsStore.editLocation(locationForm.value.id, payload)
      notificationsStore.success(`Location "${payload.name}" updated successfully!`)
    } else {
      await locationsStore.addLocation(payload)
      notificationsStore.success(`Location "${payload.name}" created successfully!`)
    }
    addEditModalOpen.value = false
  } catch (err) {
    console.error(err)
    notificationsStore.error('Failed to save business location')
  } finally {
    formSubmitting.value = false
  }
}

// QR Code Display/Download Handlers
const openQrModal = (loc) => {
  activeQrLocation.value = loc
  qrModalOpen.value = true
}

const downloadPNG = () => {
  if (!activeQrLocation.value) return
  const canvas = document.querySelector('#qr-canvas canvas')
  if (!canvas) {
    notificationsStore.error('Could not find QR canvas')
    return
  }
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `qr-${activeQrLocation.value.name.replace(/\s+/g, '-').toLowerCase()}.png`
  a.click()
  notificationsStore.success('PNG QR Code downloaded successfully!')
}

const downloadSVG = () => {
  if (!activeQrLocation.value) return
  const svgEl = document.querySelector('#qr-svg svg')
  if (!svgEl) {
    notificationsStore.error('Could not find QR SVG')
    return
  }
  const svgString = new XMLSerializer().serializeToString(svgEl)
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `qr-${activeQrLocation.value.name.replace(/\s+/g, '-').toLowerCase()}.svg`
  a.click()
  URL.revokeObjectURL(url)
  notificationsStore.success('SVG QR Code downloaded successfully!')
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  // Auto-fetch locations when default layout mounts if authenticated
  if (authStore.isAuthenticated) {
    await locationsStore.fetchLocations()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Vue Transition Group styling for toast stack */
.toast-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
.toast-leave-active {
  position: absolute;
  width: 100%;
}
.toast-move {
  transition: transform 0.4s ease;
}

/* Modal transition animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
