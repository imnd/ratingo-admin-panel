import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Location {
  id: number
  company_id: number
  uuid: string
  name: string
  google_maps_url: string
  justdial_url: string | null
  sulekha_url: string | null
  makemytrip_url: string | null
  is_active: boolean
  qr_code?: {
    id: number
    uuid: string
    scan_count: number
  }
}

export const useLocationsStore = defineStore('locations', () => {
  const locations = ref<Location[]>([])
  const currentLocationId = ref<number | null>(null)
  const loading = ref(false)

  const currentLocation = computed(() => {
    if (currentLocationId.value === null) return null
    return locations.value.find((l) => l.id === currentLocationId.value) || null
  })

  async function fetchLocations() {
    const api = useApi()
    loading.value = true
    try {
      const data = await api('/locations')
      locations.value = data
      
      // If we have locations, auto-set default selection to first element
      if (locations.value.length > 0) {
        if (currentLocationId.value === null || !locations.value.some(l => l.id === currentLocationId.value)) {
          currentLocationId.value = locations.value[0].id
        }
      } else {
        currentLocationId.value = null
      }
    } catch (err) {
      console.error('Failed to fetch locations:', err)
    } finally {
      loading.value = false
    }
  }

  async function addLocation(payload: {
    name: string
    google_maps_url: string
    justdial_url?: string | null
    sulekha_url?: string | null
    makemytrip_url?: string | null
  }) {
    const api = useApi()
    loading.value = true
    try {
      const newLoc = await api('/locations', {
        method: 'POST',
        body: payload
      })
      locations.value.push(newLoc)
      // Auto-select if it was empty
      if (locations.value.length === 1) {
        currentLocationId.value = newLoc.id
      }
      return newLoc
    } catch (err) {
      console.error('Failed to add location:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function editLocation(id: number, payload: {
    name: string
    google_maps_url: string
    justdial_url?: string | null
    sulekha_url?: string | null
    makemytrip_url?: string | null
    is_active?: boolean
  }) {
    const api = useApi()
    loading.value = true
    try {
      const updatedLoc = await api(`/locations/${id}`, {
        method: 'PUT',
        body: payload
      })
      const index = locations.value.findIndex(l => l.id === id)
      if (index !== -1) {
        locations.value[index] = updatedLoc
      }
      return updatedLoc
    } catch (err) {
      console.error('Failed to edit location:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function setCurrentLocationId(id: number | null) {
    currentLocationId.value = id
  }

  return {
    locations,
    currentLocationId,
    loading,
    currentLocation,
    fetchLocations,
    addLocation,
    editLocation,
    setCurrentLocationId
  }
})
