//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports packages and libs
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/fa-IR'
import quasarIconSet from 'quasar/icon-set/mdi-v7'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
// Import icon libraries
import '@quasar/extras/mdi-v7/mdi-v7.css'
// Import CSSs
import 'quasar/dist/quasar.css'
import 'assets/css/app.css'
import 'assets/css/font.css'
import 'assets/css/animations.css'
import 'assets/css/responsive.css'






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// App configs and uses
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = createApp(App)

app.use(router)
app.use(Quasar, {
    plugins: {
        animations: 'all'
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


const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.mount('#app')


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

