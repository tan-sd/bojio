import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { TroisJSVuePlugin } from 'troisjs';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/global.css'
import titleMixin from './utils/titleMixin';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(router).use(TroisJSVuePlugin).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBcpqqRoT6E55swScRXfN3WuJqPeD9Q9VU',
        libraries: 'places'
    },
});
app.mount('#app')
app.mixin(titleMixin)