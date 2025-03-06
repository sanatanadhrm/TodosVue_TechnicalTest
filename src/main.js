import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HeaderComponent from './components/MainHeader.vue'
import SideBarComponent from "./components/MainSideBar.vue";
import MainSectionComponent from "./components/MainSection.vue";
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia();
app.component('HeaderComponent', HeaderComponent)
app.component('SideBarComponent', SideBarComponent)
app.component('MainSectionComponent', MainSectionComponent)
app.use(pinia)
app.mount('#app')

