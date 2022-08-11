import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './styles/main.scss'

import router from './plugins/router'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
