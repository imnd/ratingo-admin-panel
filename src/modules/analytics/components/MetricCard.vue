<template>
  <div class="glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-glass-sm relative overflow-hidden transition-all duration-300 hover:border-slate-700/60 hover:shadow-glass">
    <!-- Skeleton Loading State -->
    <div v-if="loading" class="animate-pulse space-y-4">
      <div class="flex items-center justify-between">
        <div class="h-4 bg-slate-800 rounded-md w-28"></div>
        <div class="w-10 h-10 bg-slate-800 rounded-xl"></div>
      </div>
      <div class="space-y-2">
        <div class="h-8 bg-slate-800 rounded-md w-20"></div>
        <div class="h-3 bg-slate-800 rounded-md w-32"></div>
      </div>
    </div>

    <!-- Loaded Content -->
    <div v-else class="relative z-10 flex flex-col justify-between h-full">
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {{ title }}
          </span>
          <span class="text-3xl font-bold tracking-tight text-white">
            {{ formattedValue }}
          </span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/10 text-brand-400 border border-brand-500/20">
          <component :is="icon" class="w-6 h-6" />
        </div>
      </div>

      <!-- Trend / Change Status -->
      <div class="flex items-center gap-1.5 mt-2">
        <span
          v-if="change !== undefined"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
          :class="change >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
        >
          <ArrowUpRightIcon v-if="change >= 0" class="w-3.5 h-3.5" />
          <ArrowDownRightIcon v-else class="w-3.5 h-3.5" />
          <span>{{ Math.abs(change) }}%</span>
        </span>
        <span class="text-xs text-slate-500 font-medium">vs previous period</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowUpRightIcon, ArrowDownRightIcon } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  change: {
    type: Number,
    default: 0
  }
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return new Intl.NumberFormat().format(props.value)
  }
  return props.value
})
</script>
