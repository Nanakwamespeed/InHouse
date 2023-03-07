import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@/assets/styles/main.css'
import '@/assets/styles/common.css'
import '@/assets/styles/jquery-ui.css'
import '@/assets/styles/resize.css'
import '@/assets/styles/sub_contents.css'
import '@/assets/styles/main_layout.css'


// import '@/assets/js/jquery.flexisel.js'
// import '@/assets/js/tipped.min.js'
// import '@/assets/js/co/default.js'
// import '@/assets/js/co/jquery/main.js'

window.$ = window.jQuery = require('jquery')

createApp(App).use(store).use(router).mount('#app')
