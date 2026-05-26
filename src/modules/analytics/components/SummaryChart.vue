<template>
  <div class="relative glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-glass-sm min-h-[350px]">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h3 class="text-base font-bold text-slate-200">Activity & Conversion Trends</h3>
        <p class="text-xs text-slate-500 mt-0.5">Track redirects to public maps vs captured negative feedbacks</p>
      </div>
      <!-- Custom Legend -->
      <div class="flex items-center gap-4 text-xs font-semibold">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
          <span class="text-slate-400">Google Redirects</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-red-500 inline-block"></span>
          <span class="text-slate-400">Intercepted Negative</span>
        </div>
      </div>
    </div>

    <!-- Chart Canvas -->
    <div class="h-64 w-full relative">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- Semi-transparent overlay with spinner during loading -->
    <Transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 rounded-2xl bg-[#03060f]/60 backdrop-blur-[2px] flex items-center justify-center z-10"
      >
        <div class="flex flex-col items-center gap-2">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-brand-500 border-t-transparent"></div>
          <span class="text-xs text-slate-400 font-semibold tracking-wider uppercase">Loading stats...</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
    default: () => ({ labels: [], positiveRedirects: [], negativeIntercepts: [] })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const canvasRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')
  
  // Create gradients for the lines
  const gradPositive = ctx.createLinearGradient(0, 0, 0, 250)
  gradPositive.addColorStop(0, 'rgba(16, 185, 129, 0.20)')
  gradPositive.addColorStop(1, 'rgba(16, 185, 129, 0.00)')

  const gradNegative = ctx.createLinearGradient(0, 0, 0, 250)
  gradNegative.addColorStop(0, 'rgba(239, 68, 68, 0.15)')
  gradNegative.addColorStop(1, 'rgba(239, 68, 68, 0.00)')

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.chartData.labels,
      datasets: [
        {
          label: 'Google Maps Redirects',
          data: props.chartData.positiveRedirects,
          borderColor: '#10B981',
          borderWidth: 2.5,
          backgroundColor: gradPositive,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#10B981',
          pointHoverRadius: 6,
          pointRadius: 3
        },
        {
          label: 'Intercepted Negative Reviews',
          data: props.chartData.negativeIntercepts,
          borderColor: '#EF4444',
          borderWidth: 2.5,
          backgroundColor: gradNegative,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#EF4444',
          pointHoverRadius: 6,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#0d1527',
          titleColor: '#94a3b8',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          bodyFont: {
            family: 'Outfit, Inter, sans-serif'
          },
          titleFont: {
            family: 'Outfit, Inter, sans-serif'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)',
            tickBorderDash: [4, 4]
          },
          ticks: {
            color: '#64748b',
            font: {
              family: 'Outfit, Inter, sans-serif',
              size: 10
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)',
            tickBorderDash: [4, 4]
          },
          ticks: {
            color: '#64748b',
            font: {
              family: 'Outfit, Inter, sans-serif',
              size: 10
            },
            precision: 0
          },
          min: 0
        }
      }
    }
  })
}

// Watch data updates reactively
watch(() => props.chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data.labels = newData.labels
    chartInstance.data.datasets[0].data = newData.positiveRedirects
    chartInstance.data.datasets[1].data = newData.negativeIntercepts
    chartInstance.update()
  } else {
    initChart()
  }
}, { deep: true })

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
