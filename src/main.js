import Vue from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new VueIntegration({ Vue, attachProps: true })
  ],
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
