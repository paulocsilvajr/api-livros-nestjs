import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma'

import { store } from './store'

const app = createApp(App)
app.use(store)

app.mount('#app')
