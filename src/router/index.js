import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index.vue";
import Auth from "@/views/auth/Auth.vue";
import About from "@/views/about/About.vue";
import Contact from "@/views/contact/Contact.vue";
import Services from "@/views/services/Services.vue";
import Hair_Coloring from "@/views/services/components/Hair_Coloring.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      component : Index,
      name : 'index',
      meta : {
        title : "پرگولا"
      }
    },
    {
      path : '/auth',
      component : Auth,
      name : 'auth',
      meta : {
        title : "ورود به حساب"
      }
    },
    {
      path : '/about',
      component : About,
      name : 'about',
      meta : {
        title : "درباره پرگولا"
      }
    },
    {
      path : '/contact',
      component : Contact,
      name : 'contact',
      meta : {
        title : "تماس با ما"
      }
    },
    {
      path : '/services',
      component : Services,
      name : 'services',
      meta : {
        title : "خدمات پرگولا"
      },
    },
    {
      path : '/services/coloring',
      component : Hair_Coloring,
      name : 'services_coloring',
      meta : {
        title : "خدمات ( تغییر رنگ مو )"
      },
    },
  ],
})

export default router
