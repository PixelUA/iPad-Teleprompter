import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { networkInterfaces } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Serve static files from the Vue frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// In-memory state — synced to all new clients on connect
const state = {
  text: '',
  fontSize: 48,
  isMirrored: false,
  scrollPercent: 0,
  autoScrollSpeed: 0,
  isAutoScrolling: false,
  prompterViewport: { width: 1024, height: 768 },
};

// ── Socket.IO Events ──────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Send current state to the newly connected client
  socket.emit('current-state', state);

  // Text update from Remote
  socket.on('update-text', (text) => {
    state.text = text;
    socket.broadcast.emit('update-text', text);
  });

  // Scroll sync from Remote (percentage 0.0 – 1.0)
  socket.on('sync-scroll', (percent) => {
    state.scrollPercent = percent;
    socket.broadcast.emit('sync-scroll', percent);
  });

  // Settings update from Remote
  socket.on('update-settings', (settings) => {
    if (settings.fontSize !== undefined) state.fontSize = settings.fontSize;
    if (settings.isMirrored !== undefined) state.isMirrored = settings.isMirrored;
    if (settings.autoScrollSpeed !== undefined) state.autoScrollSpeed = settings.autoScrollSpeed;
    if (settings.isAutoScrolling !== undefined) state.isAutoScrolling = settings.isAutoScrolling;
    socket.broadcast.emit('update-settings', settings);
  });

  // Viewport report from Prompter (iPad)
  socket.on('report-viewport', (viewport) => {
    state.prompterViewport = viewport;
    socket.broadcast.emit('viewport-info', viewport);
  });

  // Request full state refresh
  socket.on('request-state', () => {
    socket.emit('current-state', state);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Catch-all route for Vue Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log('');
  console.log('🎬 Teleprompter Server is running!');
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://${localIP}:${PORT}`);
  console.log('');
});

// ── Helpers ───────────────────────────────────────────────
function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}
