<template>
  <div class="prompter-fullscreen min-h-dvh w-full relative" @dblclick="toggleFullscreen">
    <div class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 sm:px-12 sm:py-8
                bg-black/80 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"
         style="cursor: default;">
      <router-link to="/" class="text-sm font-medium text-gray-500 hover:text-white transition-colors no-underline">
        ← Back
      </router-link>
      <div class="flex items-center gap-3 text-sm font-medium text-gray-500">
        <span class="status-dot" :class="connected ? 'connected' : 'disconnected'" />
        <span>{{ connected ? 'Connected' : 'Disconnected' }}</span>
      </div>
    </div>

    <!-- Read position markers (fixed at screen center) -->
    <div class="fixed left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none" style="padding-left: 12px;">
      <div class="read-marker-left"></div>
    </div>
    <div class="fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none" style="padding-right: 12px;">
      <div class="read-marker-right"></div>
    </div>

    <div ref="textContainer"
         class="prompter-text w-full min-h-dvh"
         :class="{ mirrored: isMirrored }"
         :style="{ fontSize: fontSize + 'px' }">
      <div v-if="text">{{ text }}</div>
      <div v-else class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-center" :class="{ mirrored: isMirrored }">
          <p class="text-lg opacity-30 font-light">Waiting for text...</p>
          <p class="text-sm opacity-15 mt-2">Open Remote on your phone to start</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSocket } from '../composables/useSocket'

const { socket, connected } = useSocket()
const text = ref('')
const fontSize = ref(48)
const isMirrored = ref(false)
const textContainer = ref(null)

const isAutoScrolling = ref(false)
const autoScrollSpeed = ref(0)

let targetPercent = 0
let currentPercent = 0
let animationFrameId = null
let lastTime = 0

let isNetworkOverride = false
let networkOverrideTimeout = null
let resizeObserver = null
let reportViewportDebounce = null

function lerpLoop(time) {
  const delta = time - lastTime
  lastTime = time

  let needsUpdate = false

  // If we recently received a network sync (meaning user is manually dragging scrollbar),
  // we pause auto-scroll and just smoothly lerp to their finger position.
  if (isNetworkOverride) {
    currentPercent += (targetPercent - currentPercent) * 0.15
    needsUpdate = true
  } 
  // Otherwise, if auto-scrolling is enabled, animate completely locally!
  else if (isAutoScrolling.value && delta < 100) {
    const step = (0.002 / 50) * autoScrollSpeed.value * delta
    targetPercent = Math.min(1, targetPercent + step)
    currentPercent = targetPercent // Lock them so lerp doesn't fight it
    needsUpdate = true
  } 
  // Otherwise (manual scroll, but no auto-scroll), just smoothly lerp
  else if (Math.abs(targetPercent - currentPercent) > 0.000001) {
    currentPercent += (targetPercent - currentPercent) * 0.15
    needsUpdate = true
  }

  if (needsUpdate) {
    const el = document.documentElement
    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll > 0) {
      window.scrollTo({ top: currentPercent * maxScroll, behavior: 'instant' })
    }
  }
  animationFrameId = requestAnimationFrame(lerpLoop)
}

function onCurrentState(state) {
  text.value = state.text || ''
  fontSize.value = state.fontSize || 48
  isMirrored.value = state.isMirrored || false
  isAutoScrolling.value = state.isAutoScrolling || false
  autoScrollSpeed.value = state.autoScrollSpeed || 0
  
  if (state.scrollPercent !== undefined) {
    targetPercent = state.scrollPercent
    // Snap instantly on first connect
    if (Math.abs(currentPercent) < 0.000001) {
      currentPercent = state.scrollPercent
      const el = document.documentElement
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll > 0) window.scrollTo({ top: currentPercent * maxScroll, behavior: 'instant' })
    }
  }
}

function onUpdateText(newText) { text.value = newText }

function onSyncScroll(percent) { 
  targetPercent = percent 
  isNetworkOverride = true
  clearTimeout(networkOverrideTimeout)
  networkOverrideTimeout = setTimeout(() => {
    isNetworkOverride = false
    // Important: instantly snap current to target so auto-scroll seamlessly 
    // picks up exactly from where the user left off!
    currentPercent = targetPercent
  }, 100)
}

function onUpdateSettings(settings) {
  if (settings.fontSize !== undefined) fontSize.value = settings.fontSize
  if (settings.isMirrored !== undefined) isMirrored.value = settings.isMirrored
  if (settings.isAutoScrolling !== undefined) isAutoScrolling.value = settings.isAutoScrolling
  if (settings.autoScrollSpeed !== undefined) autoScrollSpeed.value = settings.autoScrollSpeed
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(lerpLoop)
  socket.on('current-state', onCurrentState)
  socket.on('update-text', onUpdateText)
  socket.on('sync-scroll', onSyncScroll)
  socket.on('update-settings', onUpdateSettings)
  socket.emit('request-state')

  // Report viewport dimensions to server for Remote preview scaling
  function reportViewport(immediate = false) {
    if (immediate) {
      socket.emit('report-viewport', {
        width: window.innerWidth,
        height: window.innerHeight,
      })
      return
    }
    clearTimeout(reportViewportDebounce)
    reportViewportDebounce = setTimeout(() => {
      socket.emit('report-viewport', {
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 300)
  }

  reportViewport(true)

  resizeObserver = new ResizeObserver(() => {
    reportViewport(false)
  })
  resizeObserver.observe(document.documentElement)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (resizeObserver) resizeObserver.disconnect()
  clearTimeout(reportViewportDebounce)
  socket.off('current-state', onCurrentState)
  socket.off('update-text', onUpdateText)
  socket.off('sync-scroll', onSyncScroll)
  socket.off('update-settings', onUpdateSettings)
})
</script>
