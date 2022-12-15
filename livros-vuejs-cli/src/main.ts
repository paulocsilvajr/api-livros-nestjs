import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
