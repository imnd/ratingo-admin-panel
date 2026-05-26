<template>
  <tr class="hover:bg-slate-800/20 transition-colors border-b border-slate-800/80 last:border-0">
    <!-- Date and Time -->
    <td class="px-6 py-4.5 whitespace-nowrap text-xs text-slate-300 font-medium">
      {{ formattedDate }}
    </td>

    <!-- Location -->
    <td class="px-6 py-4.5 whitespace-nowrap text-xs text-slate-300">
      {{ feedback.location?.name || 'Unknown' }}
    </td>

    <!-- Rating Stars -->
    <td class="px-6 py-4.5 whitespace-nowrap">
      <div class="flex items-center gap-0.5">
        <StarIcon
          v-for="index in 5"
          :key="index"
          class="w-4 h-4"
          :class="index <= feedback.rating ? getStarColorClass(feedback.rating) : 'text-slate-700'"
        />
      </div>
    </td>

    <!-- Customer Information -->
    <td class="px-6 py-4.5 whitespace-nowrap">
      <div class="text-xs font-semibold text-slate-200">{{ feedback.name || 'Guest' }}</div>
      <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
        <PhoneIcon class="w-3 h-3 text-brand-400" />
        <span>{{ formattedPhone }}</span>
      </div>
    </td>

    <!-- Comment Summary -->
    <td class="px-6 py-4.5 text-xs text-slate-300 max-w-xs truncate">
      <span class="italic text-slate-300">"{{ truncatedComment }}"</span>
    </td>

    <!-- Action Buttons -->
    <td class="px-6 py-4.5 whitespace-nowrap text-right text-xs font-semibold space-x-2">
      <!-- View Detail Trigger -->
      <button
        @click="$emit('view', feedback)"
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 hover:text-brand-300 transition-all"
      >
        <EyeIcon class="w-3.5 h-3.5" />
        <span>View</span>
      </button>

      <!-- WhatsApp Direct Contact -->
      <button
        @click="openWhatsApp"
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
      >
        <MessageCircleIcon class="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'
import { StarIcon, PhoneIcon, EyeIcon, MessageCircleIcon } from 'lucide-vue-next'
import { usePhoneFormatter } from '~/composables/usePhoneFormatter'

const props = defineProps({
  feedback: {
    type: Object,
    required: true
  }
})

defineEmits(['view'])

const { formatIndianPhone } = usePhoneFormatter()

// Format raw date in local viewer standard
const formattedDate = computed(() => {
  if (!props.feedback.created_at) return ''
  const date = new Date(props.feedback.created_at)
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
})

// Format Indian phone number
const formattedPhone = computed(() => {
  return formatIndianPhone(props.feedback.phone)
})

// Truncate comment summary for layout spacing
const truncatedComment = computed(() => {
  const comment = props.feedback.feedback_text || ''
  if (comment.length > 35) {
    return comment.substring(0, 35) + '...'
  }
  return comment
})

// Stars colors: red-500 for critical 1-star negative feedback, amber-500 for 2-3 stars
const getStarColorClass = (rating) => {
  if (rating === 1) return 'text-red-500 fill-red-500'
  return 'text-amber-500 fill-amber-500'
}

// Redirect trigger to Web WhatsApp
const openWhatsApp = () => {
  if (!props.feedback.phone) return
  // Extract only numbers for WhatsApp API
  const cleanPhone = props.feedback.phone.toString().replace(/\D/g, '')
  
  // Ensure country code is prepended without '+' sign
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
  
  // Custom message body
  const name = props.feedback.name || 'valued customer'
  const message = `Hello ${name}, thank you for visiting us. We noticed you had a less than satisfactory experience. We would love to know how we can make this right. - Team Ratingo`
  
  const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`
  
  window.open(whatsappUrl, '_blank')
}
</script>
