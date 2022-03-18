import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

export const eventBus = createApp()

createApp(App).use(Router).use(Store).mount('#app')
