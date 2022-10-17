import { async, getDefaultEmulatorHost } from "@firebase/util";
// import 'core-js/actual/promise';
// import { resolve, promise } from "core-js/fn/promise";
// import Vue from 'vue';
// import Vuex from 'vuex';
import { createRouter, createWebHistory } from "vue-router";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import HomePage from '../views/HomePage.vue'

const routes =[
  {
    path: "/",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/signup",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/login/",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/aboutpage/",
    component: () => import("../views/AboutPage.vue"),
  },
  {
    path: "/createajio",
    component: () => import("../views/CreateaJio.vue"),
    meta:{ 
      requiresAuth: true,
    }
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
  // : [
  //   {
  //     path: "/",
  //     component: () => import("../views/HomePage.vue"),
  //   },
  //   {
  //     path: "/signup",
  //     component: () => import("../views/SignUp.vue"),
  //   },
  //   {
  //     path: "/login",
  //     component: () => import("../views/LogIn.vue"),
  //   },
  //   {
  //     path: "/aboutpage",
  //     component: () => import("../views/AboutPage.vue"),
  //   },
  //   {
  //     path: "/createajio",
  //     component: () => import("../views/CreateaJio.vue"),
  //     meta:{ 
  //       requiresAuth: true,
  //     }
  //   },
  // ],
});

const getCurrentUser =() => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });

};

router.beforeEach(async (to,from,next) => { 
  if(to.matched.some((record) => record.meta.requiresAuth)) { 
    if(await getCurrentUser()){ 
      next();
    } else{ 
      alert(' You dont have access! Please login')
      next('/login');
    }
  } else{ 
    next();
  }
})
export default router;

