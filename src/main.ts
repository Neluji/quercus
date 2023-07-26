// Vue
import { createApp } from 'vue'

//Vue router
import router from './router'

// Pinia
import { createPinia } from 'pinia'

// Tailwind
import './assets/style.css'

// Leaflet
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet-src.esm.js'
window.L = L

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/lib/fontawesome'

// App creation
import App from './App.vue'
const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
