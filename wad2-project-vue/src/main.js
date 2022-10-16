import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
// import firebase from "firebase"
import Vue from 'vue';
import Message from './components/HelloWorld.vue'

import { initializeApp } from 'firebase/app'
import { TroisJSVuePlugin } from 'troisjs';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/global.css'

Vue.component('app-message', Message)

new Vue({
    el:'#app',
    render: h =>h(App)
})

// createApp(App).mount('#app')
const firebaseConfig = {
    apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
    authDomain: "wad2-project-d8ba0.firebaseapp.com",
    projectId: "wad2-project-d8ba0",
    storageBucket: "wad2-project-d8ba0.appspot.com",
    messagingSenderId: "168248515824",
    appId: "1:168248515824:web:bfcb3221af409131e07635",
    databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// firebase.initializeApp(firebaseConfig)
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router).use(TroisJSVuePlugin);
app.mount('#app')
