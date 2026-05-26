<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <!-- Modal Container -->
      <div
        class="w-full max-w-lg rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ShieldAlertIcon class="w-5 h-5 text-red-400" />
            <h3 class="text-base font-bold text-slate-200">Negative Feedback Details</h3>
          </div>
          <button
            @click="closeModal"
            class="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-slate-800/60 rounded-lg"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-5">
          <!-- Client Card -->
          <div class="grid grid-cols-2 gap-4 bg-[#070b19]/60 border border-slate-800 rounded-xl p-4">
            <div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Customer Name</p>
              <p class="text-sm font-semibold text-slate-200 mt-0.5">{{ feedback.name || 'Guest' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Phone Number</p>
              <p class="text-sm font-semibold text-slate-200 mt-0.5">{{ formattedPhone || 'Not provided' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Rating Given</p>
              <div class="flex items-center gap-0.5 mt-0.5">
                <StarIcon
                  v-for="index in 5"
                  :key="index"
                  class="w-4 h-4"
                  :class="index <= feedback.rating ? getStarColorClass(feedback.rating) : 'text-slate-700'"
                />
              </div>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Logged (Local Time)</p>
              <p class="text-xs font-medium text-slate-300 mt-0.5">{{ clientLocalDate }}</p>
            </div>
          </div>

          <!-- Raw Comment block -->
          <div>
            <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Detailed Complaint Text</p>
            <div class="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 min-h-[120px] max-h-60 overflow-y-auto">
              <p class="text-sm text-slate-300 leading-relaxed italic whitespace-pre-wrap">
                "{{ feedback.feedback_text || 'No comment provided by user.' }}"
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-800/80 bg-[#050813] flex items-center justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all"
          >
            Close Details
          </button>
          
          <button
            v-if="feedback.phone"
            @click="openWhatsApp"
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <MessageCircleIcon class="w-4 h-4" />
            <span>Contact on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { ShieldAlertIcon, XIcon, StarIcon, MessageCircleIcon } from 'lucide-vue-next'
import { usePhoneFormatter } from '~/composables/usePhoneFormatter'

const props = defineProps({
  feedback: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const { formatIndianPhone } = usePhoneFormatter()

// Format phone number
const formattedPhone = computed(() => {
  if (!props.feedback?.phone) return ''
  return formatIndianPhone(props.feedback.phone)
})

// Star ratings color themes
const getStarColorClass = (rating) => {
  if (rating === 1) return 'text-red-500 fill-red-500'
  return 'text-amber-500 fill-amber-500'
}

// Convert UTC DB Timestamp to client timezone
const clientLocalDate = computed(() => {
  if (!props.feedback?.created_at) return ''
  const date = new Date(props.feedback.created_at)
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
})

// Direct WhatsApp redirection
const openWhatsApp = () => {
  if (!props.feedback?.phone) return
  const cleanPhone = props.feedback.phone.toString().replace(/\D/g, '')
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
  const name = props.feedback.name || 'valued customer'
  const message = `Hello ${name}, thank you for visiting us. We noticed you had a less than satisfactory experience. We would love to know how we can make this right. - Team Ratingo`
  const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// Close helper
const closeModal = () => {
  emit('close')
}

// Handle keydown for escape key closure
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Modal Transition Styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
