import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import {createRouter, createWebHashHistory} from 'vue-router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus, faCircleInfo, faMagnifyingGlass, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faPenToSquare, faEye, faCircleUser } from '@fortawesome/free-regular-svg-icons'
library.add(faPlus)
library.add(faTrashCan)
library.add(faPenToSquare)
library.add(faEye)
library.add(faCircleInfo)
library.add(faMagnifyingGlass)
library.add(faCircleUser)
library.add(faAngleLeft)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
