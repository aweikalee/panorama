import { createApp } from "vue"
import "normalize.css"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import PhotoPreview from "vue3-photo-preview"
import "vue3-photo-preview/dist/index.css"

const app = createApp(App)
app.use(router)
app.use(PhotoPreview)
app.mount("#app")
