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
import Posts from "@/views/posts/Posts.vue";
import Posts_Show from "@/views/posts/Posts_Show.vue";
import Page from "@/views/pages/Page.vue";
import Categories from "@/views/posts/Categories.vue";

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
      path : '/posts/:category_id',
      component : Posts,
      name : 'posts',
      meta : {
        title : "نوسته ها"
      },
    },
    {
      path : '/posts/categories/:id',
      component : Categories,
      name : 'posts_categories',
      meta : {
        title : "دسته بندی نوشته ها"
      },
    },
    {
      path : '/posts/show/:slug',
      component : Posts_Show,
      name : 'posts_show',
      meta : {
        title : "مشاهده نوشته"
      },
    },
    {
      path : '/pages/:slug',
      component : Page,
      name : 'pages_show',
      meta : {
        title : ""
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
      path: '/profile/plans',
      component: Profile,
      name: 'profile_plans',
      meta: {
        title: "اشتراک های من"
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
