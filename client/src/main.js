import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

//remove
const path = require('path');  
require('dotenv').config({ path:
    path.join(__dirname, '.env') });

require('@/assets/main.scss');


createApp(App).mount('#app')



