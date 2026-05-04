# Project: Local Network Teleprompter Web App

## 🎯 Context & Goal
You are an expert Full-Stack Web Developer. Your task is to build a real-time, client-server web application that turns an iPad into a teleprompter, controlled remotely via a smartphone over a local Wi-Fi network. 

The application must be lightweight, responsive, and optimize for minimal latency using WebSockets.

## 🛠 Tech Stack
*   **Backend:** Node.js, Express, Socket.IO
*   **Frontend:** Vue.js (Composition API, `<script setup>`), Vite, TailwindCSS (for quick UI styling), Socket.IO-Client
*   **Deployment:** Local network only (running via `localhost` and accessible via local IP `192.168.x.x`).

## 🏗 Architecture & Roles
The application has one unified backend but serves two distinct frontend views (routes or dynamic components):
1.  **Prompter View (iPad):** The screen that the presenter looks at. It displays large text, auto-scrolls or syncs scroll with the remote, and can flip the text horizontally (mirror mode) for use in physical teleprompter hardware.
2.  **Remote View (Smartphone):** The control center. It allows the user to paste/edit text, change settings (font size, mirror mode), and control the scroll position in real-time.

## ⚙️ Core Requirements & Features

### 1. Networking & Connection
*   The Node.js server must listen on `0.0.0.0` so it can be accessed from any device on the local network.
*   Upon opening the app, the user chooses their role: "Prompter" or "Remote".

### 2. Real-Time Text Synchronization
*   The Remote view has a `<textarea>` to input/edit the speech text.
*   Any changes in the text on the Remote must instantly update the text displayed on the Prompter view via Socket.IO.

### 3. Scroll Synchronization (CRITICAL)
*   Because the iPad and Smartphone have different screen resolutions and aspect ratios, scrolling MUST be calculated in **percentages (0.0 to 1.0)**, not pixels.
*   **Remote logic:** When the user scrolls the text container on the phone, calculate `scrollTop / (scrollHeight - clientHeight)` and emit this percentage to the server.
*   **Prompter logic:** Listen for the percentage, calculate the target pixel position for the iPad's specific screen (`percentage * (scrollHeight - clientHeight)`), and apply `window.scrollTo` with `behavior: 'instant'`.

### 4. Prompter Settings (Controlled from Remote)
*   **Font Size:** A slider on the Remote to adjust the font size (`rem` or `px`) on the Prompter in real-time.
*   **Mirror Mode:** A toggle on the Remote that applies a CSS `transform: scaleX(-1);` to the Prompter's text container.

## 📝 Step-by-Step Implementation Plan for AI

Please implement the project following these steps:

**Step 1: Project Setup**
*   Initialize a Vite + Vue frontend in a `/client` folder.
*   Initialize a Node.js + Express backend in a `/server` folder.
*   Install necessary dependencies (`socket.io`, `socket.io-client`, `tailwindcss`).

**Step 2: Backend Logic (`/server/index.js`)**
*   Set up Express and Socket.IO on port `3000`.
*   Handle connection/disconnection.
*   Create socket event listeners for: `update-text`, `sync-scroll`, `update-settings`.
*   Broadcast these events to all other connected clients.

**Step 3: Frontend Routing & State (`/client`)**
*   Create a simple state management (or use Vue `ref`/`reactive`) to hold the `text`, `fontSize`, and `isMirrored` status.
*   Create two main components: `PrompterView.vue` and `RemoteControl.vue`.
*   Create a `Home.vue` or basic UI to select which view to open.

**Step 4: Frontend UI & Socket Integration**
*   **RemoteControl.vue:** Build the text area, font size slider, mirror toggle, and attach scroll event listeners to emit percentages.
*   **PrompterView.vue:** Build the display container. Bind the CSS styles for font size and transform (mirror). Listen to scroll events from the socket and update the scroll position programmatically.

## 🚀 Execution
Please generate the complete file structure and necessary code for both the backend and frontend based on the requirements above. Start with the package.json setups and the backend server code.