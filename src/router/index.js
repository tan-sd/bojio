import { async, getDefaultEmulatorHost } from "@firebase/util";
import { createRouter, createWebHistory } from "vue-router";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'

const routes =[
  {
    path: "/",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/:active",
    name:'default',
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
    path: "/resetpassword/",
    component: () => import("../views/ResetPassword.vue"),
  },
  {
    path: "/aboutpage/",
    component: () => import("../views/AboutPage.vue"),
  },
  {
    path: "/createajio",
    name: 'createajio',
    component: () => import("../views/CreateaJio.vue"),
    meta:{ 
      requiresAuth: true,
    }
  },
  {
    path: "/createajio/:idx",
    name: 'createajioParams', 
    component: () => import("../views/CreateaJio.vue"),
    meta:{ 
      requiresAuth: true,
    }
  },
  {
    path: "/friendspage",
    component: () => import("../views/FriendsPage.vue"),
  },
  {
    path: "/events/:idx",
    name: 'event',
    component: () => import ("../views/EventPage.vue"),
  },
  {
    path: "/friendspage/:idx",
    name: 'individual profile',
    component: () => import ("../views/FriendProfile.vue"),
  },
  {
    path: "/jiopage/:idx",
    name: 'eachjioevent',
    component: () => import ("../views/JioPage.vue"),
  },
  {
    path: "/:idx",
    name: 'publicevents',
    component: () => import ("../views/HomePage.vue"),
  },
  {
    path: "/profile/:idx",
    name: 'profile',
    component: () => import ("../views/MyProfile.vue"),
  },
  {
    path: "/login/",
    name: 'notloggedin',
    component: () => import ("../views/LogIn.vue"),
    meta:{ 
      requiresAuth: true,
    },
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
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
      next('/login?status=notAuth');
    }
  } else{ 
    next();
  }
})

export default router