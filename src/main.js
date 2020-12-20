import Vue, { createApp } from 'vue';
import App from './App.vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new VueIntegration({ Vue, attachProps: true })
  ],
});

createApp(App).mount('#app')
