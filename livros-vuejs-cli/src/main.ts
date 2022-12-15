import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma'

import router from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')
