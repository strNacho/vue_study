import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import axios from 'axios';
import store from './store'

let app = createApp(App);
let emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.axios = axios;

app.use(store).mount('#app')
