import { ref, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

// Singleton socket instance shared across components
let socket = null

export function useSocket() {
  const connected = ref(false)

  if (!socket) {
    const serverUrl = import.meta.env.PROD 
      ? window.location.origin 
      : `http://${window.location.hostname}:3000`
    socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
    })
  }

  socket.on('connect', () => {
    connected.value = true
  })

  socket.on('disconnect', () => {
    connected.value = false
  })

  // Set initial connection state
  connected.value = socket.connected

  onUnmounted(() => {
    // Don't disconnect; keep singleton alive
    socket.off('connect')
    socket.off('disconnect')
  })

  return { socket, connected }
}
