import { createApp } from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/vue'

const app = createApp(App).mount('#app')

Sentry.init({
  app,
  dsn: import.meta.env.VUE_APP_SENTRY_DSN,
})
