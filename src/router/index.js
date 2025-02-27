import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index.vue";
import Auth from "@/views/auth/Auth.vue";
import About from "@/views/about/About.vue";
import Contact from "@/views/contact/Contact.vue";
import Services from "@/views/services/Services.vue";
import Hair_Coloring from "@/views/services/components/Hair_Coloring.vue";
import Profile from "@/views/profile/Profile.vue";

import {Stores_Auth} from "@/stores/auth/auth.js";
import Plans from "@/views/plans/Plans.vue";

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
      path : '/plans',
      component : Plans,
      name : 'plans',
      meta : {
        title : "مدیریت اشتراک ها"
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
    {
      path: '/profile',
      component: Profile,
      name: 'profile',
      meta: {
        title: "حساب کاربری"
      },
    },
    {
      path: '/profile/saved',
      component: Profile,
      name: 'profile_saved',
      meta: {
        title: "موارد ذخیره شده"
      },
    },
    {
      path: '/profile/invoices',
      component: Profile,
      name: 'profile_invoices',
      meta: {
        title: "لیست پرداخت ها"
      },
    },
    {
      path: '/profile/invoices/:id',
      component: Profile,
      name: 'profile_invoices_show',
      meta: {
        title: "جزئیات پرداخت"
      },
    },
  ],
})
// Check Authenticate
router.beforeEach((to, from, next) => {
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (to.path === '/profile' && !Stores_Auth().AuthGetCheckAuth) {
    next('/auth');
  }else if (to.path === '/auth' && Stores_Auth().AuthGetCheckAuth){
    next('/profile');
  }
  else {
    next();
  }
});
export default router
