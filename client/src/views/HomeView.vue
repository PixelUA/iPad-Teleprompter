<template>
  <div class="min-h-dvh flex items-center justify-center relative overflow-y-auto py-12 sm:py-24">
    <!-- Background effects -->
    <div class="absolute inset-0 pointer-events-none fixed">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
           style="background: radial-gradient(circle, rgba(108,71,255,0.2) 0%, transparent 70%); filter: blur(60px);" />
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25"
           style="background: radial-gradient(circle, rgba(56,224,248,0.15) 0%, transparent 70%); filter: blur(60px);" />
    </div>

    <!-- Main content -->
    <div class="relative z-10 text-left max-w-[320px] w-full px-4 my-auto">
      <!-- Logo / Title -->
      <div class="animate-fade-in-up text-center" style="margin-bottom: 3rem;">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-[1.25rem] shadow-2xl"
             style="margin-bottom: 2.5rem; background: linear-gradient(135deg, var(--color-accent-500), var(--color-cyan-400)); box-shadow: 0 12px 32px rgba(108, 71, 255, 0.3);">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-white mb-2">Teleprompter</h1>
        <p class="text-sm text-gray-400 font-light tracking-wide">
          Real-time teleprompter for local network
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col" style="gap: 1rem;">
        <!-- Prompter Button -->
        <router-link to="/prompter" id="btn-prompter"
          class="animate-fade-in-up-delay glass-card w-full block transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-2xl hover:border-accent-500/40 group no-underline"
          style="padding: 0 !important;">
          <div class="flex items-center w-full" style="padding: 1rem; gap: 1rem;">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl shrink-0
                        transition-all duration-300 shadow-inner group-hover:bg-accent-500/20"
                 style="background: linear-gradient(135deg, rgba(108,71,255,0.15), rgba(108,71,255,0.02)); border: 1px solid rgba(108,71,255,0.1);">
              <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                   style="color: var(--color-accent-400);"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
              </svg>
            </div>
            <div>
              <h2 class="text-base font-semibold text-white mb-0.5">Open Prompter</h2>
              <p class="text-[11px] text-gray-400 font-light">iPad display — presenter view</p>
            </div>
            <svg class="w-4 h-4 text-gray-500 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </router-link>

        <!-- Remote Button -->
        <router-link to="/remote" id="btn-remote"
          class="animate-fade-in-up-delay-2 glass-card w-full block transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-400/40 group no-underline"
          style="padding: 0 !important;">
          <div class="flex items-center w-full" style="padding: 1rem; gap: 1rem;">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl shrink-0
                        transition-all duration-300 shadow-inner group-hover:bg-cyan-400/20"
                 style="background: linear-gradient(135deg, rgba(56,224,248,0.15), rgba(56,224,248,0.02)); border: 1px solid rgba(56,224,248,0.1);">
              <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                   style="color: var(--color-cyan-400);"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18h9" />
              </svg>
            </div>
            <div>
              <h2 class="text-base font-semibold text-white mb-0.5">Open Remote</h2>
              <p class="text-[11px] text-gray-400 font-light">Smartphone — control center</p>
            </div>
            <svg class="w-4 h-4 text-gray-500 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </router-link>
      </div>

      <!-- Connection Status -->
      <div class="animate-fade-in-up-delay-2 flex items-center justify-start gap-2 text-[11px] text-gray-500" style="margin-top: 3rem;">
        <span class="status-dot" :class="connected ? 'connected' : 'disconnected'" />
        <span>{{ connected ? 'Connected' : 'Connecting...' }}</span>
        <span class="mx-2">·</span>
        <span class="font-mono text-gray-600">{{ serverAddress }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSocket } from '../composables/useSocket'

const { connected } = useSocket()

const serverAddress = computed(() => {
  return `${window.location.hostname}:3000`
})
</script>
