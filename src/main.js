//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports packages and libs
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar,Notify,LoadingBar,Dialog } from 'quasar'
import quasarLang from 'quasar/lang/fa-IR'
import quasarIconSet from 'quasar/icon-set/mdi-v7'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import methods from './helpers/methods.js';
// Import icon libraries
import '@quasar/extras/mdi-v7/mdi-v7.css'
// Import CSSs
import 'quasar/dist/quasar.css'
import 'assets/css/app.css'
import 'assets/css/font.css'
import 'assets/css/animations.css'
import 'assets/css/responsive.css'
import Global_Loadings_Colorful from "@/components/global/loading/Global_Loadings_Colorful.vue";



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// App configs and uses
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = createApp(App)

app.use(router)
app.use(Quasar, {
        plugins: {
            Notify,
            LoadingBar,
            Dialog
        }, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,

})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals Filters
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.config.globalProperties.$filters={

    text_shorter(text,count=25){

        let text_count=text.length;
        if(text_count<= count){
            return text
        }else{
            return text.substring(0,count)+ " ..." ;
        }

    },
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals components
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.component("global_loading_colorful",Global_Loadings_Colorful)



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.mixin(methods);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.mount('#app')


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

