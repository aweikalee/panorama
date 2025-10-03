import { createApp } from "vue"
import "normalize.css"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import EasyLightBox from "vue-easy-lightbox"

const app = createApp(App)
app.use(router)
app.use(EasyLightBox)
app.mount("#app")
