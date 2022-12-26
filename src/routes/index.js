import LoginPage from '../pages/LoginPage.vue'
import MainPage from '../pages/MainPage.vue'
import SetupPage from '../pages/SetupPage.vue'
import ChangePinPage from '../pages/ChangePinPage.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/main', component: MainPage },
    { path: '/setting', component: SetupPage },
    { path: '/change-pin', component: ChangePinPage }
]

export default routes;