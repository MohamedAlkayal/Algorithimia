import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
    .use(Vue3Toasity, {
        autoClose: 1500,
    })
    .mount('#app')
