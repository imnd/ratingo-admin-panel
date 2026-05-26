import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Feedback {
  id: number
  uuid: string
  location_id: number
  phone: string | null
  name: string | null
  source: 'qr' | 'whatsapp'
  status: 'pending' | 'scanned' | 'positive_redirect' | 'negative_form_filled'
  rating: number | null
  feedback_text: string | null
  created_at: string
  updated_at: string
  location?: {
    id: number
    name: string
  }
}

export const useFeedbackStore = defineStore('feedback', () => {
  const feedbacks = ref<Feedback[]>([])
  const loading = ref(false)

  // Filters State
  const filters = ref({
    location_id: null as number | null,
    date_from: '',
    date_to: '',
    search: ''
  })

  // Pagination State
  const pagination = ref({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 1
  })

  async function fetchFeedbacks() {
    const api = useApi()
    loading.value = true
    try {
      const data = await api('/feedback', {
        query: {
          location_id: filters.value.location_id,
          date_from: filters.value.date_from,
          date_to: filters.value.date_to,
          search: filters.value.search,
          page: pagination.value.page,
          limit: pagination.value.limit
        }
      })
      feedbacks.value = data.data
      pagination.value.total = data.pagination.total
      pagination.value.totalPages = data.pagination.totalPages
    } catch (err) {
      console.error('Failed to fetch feedback logs:', err)
    } finally {
      loading.value = false
    }
  }

  function setPage(page: number) {
    pagination.value.page = page
  }

  function setFilters(newFilters: Partial<typeof filters.value>) {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset pagination on filter change
  }

  return {
    feedbacks,
    loading,
    filters,
    pagination,
    fetchFeedbacks,
    setPage,
    setFilters
  }
})
