<template>
  <div>
    <!-- Routing Shell -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Toast Notifications Stack -->
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in notifications"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl glass-panel shadow-glass animate-slide-in-right relative overflow-hidden group"
          :class="getToastBorderClass(toast.type)"
        >
          <!-- Toast Left Color Accent Bar -->
          <div class="absolute left-0 top-0 bottom-0 w-1" :class="getToastBgClass(toast.type)"></div>

          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            <component
              :is="getToastIcon(toast.type)"
              class="w-5 h-5"
              :class="getToastTextClass(toast.type)"
            />
          </div>

          <!-- Message -->
          <div class="flex-grow pr-4">
            <p class="text-sm font-medium text-slate-100 leading-tight">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            @click="removeToast(toast.id)"
            class="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <XIcon class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  XOctagonIcon,
  InfoIcon,
  XIcon
} from 'lucide-vue-next'
import { useNotificationsStore } from '~/stores/notifications'

const notificationsStore = useNotificationsStore()
const notifications = computed(() => notificationsStore.notifications)

const removeToast = (id) => {
  notificationsStore.remove(id)
}

const getToastIcon = (type) => {
  switch (type) {
    case 'success': return CheckCircle2Icon
    case 'error': return XOctagonIcon
    case 'warning': return AlertTriangleIcon
    default: return InfoIcon
  }
}

const getToastBorderClass = (type) => {
  switch (type) {
    case 'success': return 'border-emerald-500/20'
    case 'error': return 'border-red-500/20'
    case 'warning': return 'border-amber-500/20'
    default: return 'border-blue-500/20'
  }
}

const getToastBgClass = (type) => {
  switch (type) {
    case 'success': return 'bg-emerald-500'
    case 'error': return 'bg-red-500'
    case 'warning': return 'bg-amber-500'
    default: return 'bg-blue-500'
  }
}

const getToastTextClass = (type) => {
  switch (type) {
    case 'success': return 'text-emerald-400'
    case 'error': return 'text-red-400'
    case 'warning': return 'text-amber-400'
    default: return 'text-blue-400'
  }
}
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
</style>
