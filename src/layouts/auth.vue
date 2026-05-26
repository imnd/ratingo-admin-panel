<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 bg-[#030712] overflow-hidden">
    <!-- Abstract glowing circles in background for premium modern vibe -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px]"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>

    <!-- Center Card -->
    <div class="w-full max-w-md glass-panel rounded-2xl shadow-glass-lg p-8 relative z-10 border border-slate-700/30">
      <!-- Logo/Brand Icon -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-12 h-12 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 mb-3">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Ratingo Merchant
        </h1>
        <p class="text-slate-400 text-xs mt-1">Reputation Management SaaS Platform</p>
      </div>

      <!-- Main Slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
// Layout for auth views
</script>
