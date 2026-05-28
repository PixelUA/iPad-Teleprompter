<template>
  <div class="min-h-dvh pb-4">
    <!-- Header -->
    <header class="sticky top-0 z-40 px-4 py-2 bg-surface-900/90 backdrop-blur-lg border-b border-white/5">
      <div class="flex items-center justify-between max-w-2xl mx-auto">
        <router-link to="/" class="text-gray-400 hover:text-white transition-colors no-underline flex items-center gap-1.5 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </router-link>
        <h1 class="text-sm font-semibold text-white">Remote Control</h1>
        <div class="flex items-center gap-1.5">
          <span class="status-dot" :class="connected ? 'connected' : 'disconnected'" />
          <span class="text-xs text-gray-500">{{ connected ? 'Live' : 'Offline' }}</span>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto flex flex-col remote-main" style="gap: 0.75rem;">
      <!-- Text Input Section -->
      <section class="glass-card animate-fade-in-up" style="padding: 1.5rem;">
        <label for="speech-text" class="flex items-center gap-2 text-sm font-medium text-gray-300" style="margin-bottom: 1.25rem;">
          <svg class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          Speech Text
        </label>
        <textarea
          id="speech-text"
          v-model="text"
          @input="onTextChange"
          placeholder="Paste or type your speech here..."
          rows="6"
          class="w-full bg-surface-800 border border-white/5 rounded-xl text-base text-white
                 placeholder-gray-600 resize-y outline-none transition-all duration-200
                 focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20
                 font-mono leading-relaxed"
          style="padding: 1rem 1.25rem;"
        />
        <p class="text-xs text-gray-600 mt-2">{{ charCount }} characters</p>
      </section>

      <!-- Settings Section -->
      <section class="glass-card animate-fade-in-up-delay" style="padding: 1.5rem;">
        <h2 class="flex items-center gap-2 text-sm font-medium text-gray-300" style="margin-bottom: 2rem;">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Display Settings
        </h2>

        <!-- Font Size -->
        <div style="margin-bottom: 2.5rem;">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400">Font Size</span>
            <span class="text-sm font-mono font-semibold text-accent-400">{{ fontSize }}px</span>
          </div>
          <input
            id="font-size-slider"
            type="range"
            v-model.number="fontSize"
            @input="onSettingsChange"
            min="16"
            max="140"
            step="2"
          />
          <div class="flex justify-between text-xs text-gray-600 mt-1">
            <span>16px</span>
            <span>140px</span>
          </div>
        </div>

        <!-- Mirror Mode -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span class="text-sm text-gray-400">Mirror Mode</span>
          </div>
          <div
            id="mirror-toggle"
            class="toggle-switch"
            :class="{ active: isMirrored }"
            @click="toggleMirror"
          />
        </div>
      </section>

      <!-- Scroll Preview & Control -->
      <section class="glass-card animate-fade-in-up-delay-2" style="padding: 1.5rem;">
        <h2 class="flex items-center gap-2 text-sm font-medium text-gray-300" style="margin-bottom: 1.5rem;">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Scroll Control
        </h2>

        <!-- Auto-scroll controls -->
        <div class="flex items-center gap-3 mb-4">
          <button
            id="btn-scroll-up"
            @click="scrollStep(-0.05)"
            class="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-700 hover:bg-surface-600
                   text-gray-300 hover:text-white transition-all duration-200 active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>

          <button
            id="btn-auto-scroll"
            @click="toggleAutoScroll"
            class="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95"
            :class="autoScrollActive
              ? 'bg-accent-500 hover:bg-accent-600 text-white'
              : 'bg-surface-700 hover:bg-surface-600 text-gray-300 hover:text-white'">
            <svg v-if="!autoScrollActive" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            {{ autoScrollActive ? 'Stop Auto-Scroll' : 'Start Auto-Scroll' }}
          </button>

          <button
            id="btn-scroll-down"
            @click="scrollStep(0.05)"
            class="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-700 hover:bg-surface-600
                   text-gray-300 hover:text-white transition-all duration-200 active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <!-- Auto-scroll speed -->
        <div style="margin-top: 1.5rem; margin-bottom: 2.5rem;">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400">Auto-Scroll Speed</span>
            <span class="text-sm font-mono font-semibold text-cyan-400">{{ Number(autoScrollSpeed).toFixed(1) }}x</span>
          </div>
          <input
            id="scroll-speed-slider"
            type="range"
            v-model.number="autoScrollSpeed"
            @input="onSettingsChange"
            min="0"
            max="2"
            step="0.1"
          />
        </div>

        <!-- Scroll preview area -->
        <div class="relative mt-6">
          <!-- Read position markers -->
          <div class="absolute left-1 z-10 pointer-events-none -translate-y-1/2"
               :style="{ top: previewMarkerTop + 'px' }">
            <div class="read-marker-left sm"></div>
          </div>
          <div class="absolute right-1 z-10 pointer-events-none -translate-y-1/2"
               :style="{ top: previewMarkerTop + 'px' }">
            <div class="read-marker-right sm"></div>
          </div>

          <div
            ref="scrollPreview"
            @scroll="onPreviewScroll"
            @touchstart="isUserInteracting = true"
            @touchend="isUserInteracting = false"
            @touchcancel="isUserInteracting = false"
            @mousedown="isUserInteracting = true"
            @mouseup="isUserInteracting = false"
            @mouseleave="isUserInteracting = false"
            @wheel="onWheel"
            class="h-[40vh] overflow-y-auto overflow-x-hidden rounded-xl bg-black border border-white/5
                   text-white">
            <div v-if="text" class="prompter-preview-text"
                 :style="{
                   fontSize: previewFontSize + 'px',
                   padding: previewTopPad + 'px 10% ' + previewBottomPad + 'px 10%'
                 }">{{ text }}</div>
            <div v-else class="text-center text-gray-600 py-6" style="padding: 1.25rem;">
              <p>Text preview will appear here</p>
            </div>
          </div>
        </div>

        <!-- Scroll position indicator -->
        <div class="mt-3 flex items-center gap-2">
          <div class="flex-1 h-1 rounded-full bg-surface-700 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-150"
                 style="background: linear-gradient(90deg, var(--color-accent-500), var(--color-cyan-400));"
                 :style="{ width: (scrollPercent * 100) + '%' }" />
          </div>
          <span class="text-xs font-mono text-gray-500 w-10 text-right">{{ Math.round(scrollPercent * 100) }}%</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSocket } from '../composables/useSocket'

const { socket, connected } = useSocket()

// ── State ─────────────────────────────────────────
// Load initial text and settings from LocalStorage
const savedText = localStorage.getItem('teleprompter-text') || ''
const savedFontSize = localStorage.getItem('teleprompter-font-size')
const savedMirrored = localStorage.getItem('teleprompter-mirrored')

const text = ref(savedText)
const fontSize = ref(savedFontSize ? parseInt(savedFontSize, 10) : 48)
const isMirrored = ref(savedMirrored === 'true')
const scrollPercent = ref(0)
const scrollPreview = ref(null)

const autoScrollActive = ref(false)
const autoScrollSpeed = ref(1)
let autoScrollInterval = null

const charCount = computed(() => text.value.length)

// ── Prompter Viewport Sync ────────────────────────
const prompterViewport = ref({ width: 1024, height: 768 })
const previewWidth = ref(300)
const previewHeight = ref(300)

const scale = computed(() => {
  if (prompterViewport.value.width <= 0) return 1
  return previewWidth.value / prompterViewport.value.width
})

const previewFontSize = computed(() => {
  return Math.max(4, fontSize.value * scale.value)
})

// Vertical padding computed so that scroll % maps to the same text position.
// Derivation: iPad top padding = 50vh = 0.5 * viewportHeight,
// iPad total padding = 1.0 * viewportHeight.
// For the linear scroll-to-text mapping to be identical on both devices:
//   P_top_preview  = 0.5 * iPadHeight * scale
//   P_bot_preview  = max(0, previewHeight - 0.5 * iPadHeight * scale)
const previewTopPad = computed(() => {
  return 0.5 * prompterViewport.value.height * scale.value
})

const previewBottomPad = computed(() => {
  return Math.max(0, previewHeight.value - 0.5 * prompterViewport.value.height * scale.value)
})

// Position of the "read line" marker in the preview, corresponding to
// the center of the iPad screen where the reader's eyes focus.
const previewMarkerTop = computed(() => {
  return 0.5 * prompterViewport.value.height * scale.value
})

// ── Text ──────────────────────────────────────────
let textDebounce = null
function onTextChange() {
  localStorage.setItem('teleprompter-text', text.value)
  clearTimeout(textDebounce)
  textDebounce = setTimeout(() => {
    socket.emit('update-text', text.value)
  }, 100)
}

// ── Settings ──────────────────────────────────────
function onSettingsChange() {
  localStorage.setItem('teleprompter-font-size', fontSize.value)
  localStorage.setItem('teleprompter-mirrored', isMirrored.value)
  socket.emit('update-settings', {
    fontSize: fontSize.value,
    isMirrored: isMirrored.value,
    autoScrollSpeed: autoScrollSpeed.value
  })
}

function toggleMirror() {
  isMirrored.value = !isMirrored.value
  onSettingsChange()
}

// ── Scroll ────────────────────────────────────────
const isUserInteracting = ref(false)
let wheelTimeout = null

function onWheel() {
  isUserInteracting.value = true
  clearTimeout(wheelTimeout)
  wheelTimeout = setTimeout(() => {
    isUserInteracting.value = false
  }, 150)
}

let lastScrollEmitTime = 0
let scrollEmitTimeout = null
const EMIT_THROTTLE_MS = 60 // ~16 updates per second

function onPreviewScroll() {
  // Only sync if the user is manually scrolling (interacting) OR auto-scroll is off
  // If auto-scroll is on and no interaction, we ignore this event to prevent feedback loop
  if (autoScrollActive.value && !isUserInteracting.value) return

  const el = scrollPreview.value
  if (!el) return

  const maxScroll = el.scrollHeight - el.clientHeight
  if (maxScroll > 0) {
    scrollPercent.value = el.scrollTop / maxScroll

    const now = performance.now()

    // Clear any pending trailing-edge emit
    if (scrollEmitTimeout) {
      clearTimeout(scrollEmitTimeout)
      scrollEmitTimeout = null
    }

    if (now - lastScrollEmitTime >= EMIT_THROTTLE_MS) {
      socket.emit('sync-scroll', scrollPercent.value)
      lastScrollEmitTime = now
    } else {
      // Schedule a trailing-edge emit to guarantee the final position is sent
      scrollEmitTimeout = setTimeout(() => {
        socket.emit('sync-scroll', scrollPercent.value)
        lastScrollEmitTime = performance.now()
      }, EMIT_THROTTLE_MS)
    }
  }
}

function scrollStep(delta) {
  scrollPercent.value = Math.max(0, Math.min(1, scrollPercent.value + delta))
  socket.emit('sync-scroll', scrollPercent.value)

  const el = scrollPreview.value
  if (el) {
    const maxScroll = el.scrollHeight - el.clientHeight
    el.scrollTop = scrollPercent.value * maxScroll
  }
}

// ── Auto Scroll ───────────────────────────────────
let autoScrollRAF = null
let lastTime = 0

function autoScrollLoop(time) {
  if (!autoScrollActive.value) return

  const delta = time - lastTime
  lastTime = time

  if (delta < 100) {
    // Only advance auto-scroll if the user is NOT actively dragging the scrollbar or swiping
    if (!isUserInteracting.value) {
      const step = (0.002 / 50) * autoScrollSpeed.value * delta
      scrollPercent.value = Math.max(0, Math.min(1, scrollPercent.value + step))

      const el = scrollPreview.value
      if (el) {
        const maxScroll = el.scrollHeight - el.clientHeight
        el.scrollTop = scrollPercent.value * maxScroll
      }
    }
  }

  if (scrollPercent.value >= 1) {
    stopAutoScroll()
  } else {
    autoScrollRAF = requestAnimationFrame(autoScrollLoop)
  }
}

function startAutoScroll() {
  if (autoScrollRAF) cancelAnimationFrame(autoScrollRAF)
  autoScrollActive.value = true
  lastTime = performance.now()
  autoScrollRAF = requestAnimationFrame(autoScrollLoop)
  
  socket.emit('update-settings', { 
    isAutoScrolling: true,
    autoScrollSpeed: autoScrollSpeed.value 
  })
  socket.emit('sync-scroll', scrollPercent.value)
}

function stopAutoScroll() {
  if (autoScrollRAF) {
    cancelAnimationFrame(autoScrollRAF)
    autoScrollRAF = null
  }
  autoScrollActive.value = false
  
  socket.emit('update-settings', { isAutoScrolling: false })
  socket.emit('sync-scroll', scrollPercent.value)
}

function toggleAutoScroll() {
  if (autoScrollActive.value) stopAutoScroll()
  else startAutoScroll()
}

// ── Socket listeners ──────────────────────────────
function onCurrentState(state) {
  // If the server state has no text, but we have locally saved text, restore it to the server
  if (!state.text && text.value) {
    socket.emit('update-text', text.value)
    socket.emit('update-settings', {
      fontSize: fontSize.value,
      isMirrored: isMirrored.value,
      autoScrollSpeed: autoScrollSpeed.value
    })
  } else {
    // Server has a valid state, sync client to server
    text.value = state.text || ''
    fontSize.value = state.fontSize || 48
    isMirrored.value = state.isMirrored || false
    scrollPercent.value = state.scrollPercent || 0
    
    // Update local storage to match server state
    localStorage.setItem('teleprompter-text', text.value)
    localStorage.setItem('teleprompter-font-size', fontSize.value)
    localStorage.setItem('teleprompter-mirrored', isMirrored.value)
  }

  if (state.prompterViewport) {
    prompterViewport.value = state.prompterViewport
  }
}

function onViewportInfo(viewport) {
  prompterViewport.value = viewport
}

let previewObserver = null

onMounted(() => {
  socket.on('current-state', onCurrentState)
  socket.on('viewport-info', onViewportInfo)
  socket.emit('request-state')

  // Track preview dimensions for scaled rendering
  if (scrollPreview.value) {
    previewObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        previewWidth.value = entry.contentRect.width
        previewHeight.value = entry.contentRect.height
      }
    })
    previewObserver.observe(scrollPreview.value)
  }
})

onUnmounted(() => {
  socket.off('current-state', onCurrentState)
  socket.off('viewport-info', onViewportInfo)
  if (previewObserver) {
    previewObserver.disconnect()
    previewObserver = null
  }
  stopAutoScroll()
  clearTimeout(textDebounce)
  clearTimeout(scrollEmitTimeout)
})
</script>
