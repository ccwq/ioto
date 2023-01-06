import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// install elements-plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
app.use(ElementPlus)

app.use(createPinia())
app.use(router)

// import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)


app.mount('#app')
