import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import { hasToken } from '../services/Token'
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta:{
        auth: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => { 
  const authStore = useAuthStore();
  const isLoggedIn = authStore.user_information.isLoggedIn && hasToken(); 

  if(to.meta?.auth === true){
    authStore.validateAuth(isLoggedIn).then((isValidToken) =>{
      if(!isValidToken){
        next({name: "login"});
      }else{
        next();
      }
    });
  }else{    
    authStore.validateAuth(isLoggedIn).then((isValidToken) =>{
      if(isValidToken){
        next({name: "dashboard"});
      }else{
        next();
      }
    });
  }

  


});

export default router
