import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// import firebase from "firebase"

import { TroisJSVuePlugin } from 'troisjs';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/global.css'
import titleMixin from './utils/titleMixin';

// createApp(App).mount('#app')
// const firebaseConfig = {
//     apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
//     authDomain: "wad2-project-d8ba0.firebaseapp.com",
//     projectId: "wad2-project-d8ba0",
//     storageBucket: "wad2-project-d8ba0.appspot.com",
//     messagingSenderId: "168248515824",
//     appId: "1:168248515824:web:bfcb3221af409131e07635",
//     databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };


// initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router).use(TroisJSVuePlugin).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBcpqqRoT6E55swScRXfN3WuJqPeD9Q9VU',
    },
});
app.mount('#app')
app.mixin(titleMixin)