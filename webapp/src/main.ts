import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

//Tailwind
import './css/tailwind.css'

//capacitor
import { Capacitor } from '@capacitor/core';

//detect stand alone
const isInCapacitor = Capacitor.isNativePlatform()
const isInWebAppiOS = ( (window.navigator as any).standalone === true);
const isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

let standalone = false

if(isInWebAppiOS || isInWebAppChrome || isInCapacitor){
    standalone = true
}

// 1. Assign app to a variable
const app = createApp(App)

// 2. Assign the global variable before mounting
app.config.globalProperties.standalone = standalone

// 3. Use router and mount app
app.use(router).mount('#app')
