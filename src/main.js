import { createApp } from 'vue'
import { router } from './router/index'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const app = createApp(App)

new WaveUI(app, {
  // Some Wave UI options.
})

app.use(router).mount('#app')