import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuestionList from '../views/QuestionList';
import Quiz from '../views/Quizz';
import Vuetify from "../views/Vuetify";
import Categories from "../components/Categories/Categories";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/question-list/:qid',
    name: 'QuestionList',
    component: QuestionList,
  },
  {
    path: '/quiz/:qid/:quizId',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/vue',
    name: 'Vuetify',
    component: Vuetify
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const isCordova = !!window.cordova;
console.log("isCordova while setting rouer",isCordova);
const modeObj = {};
if (!isCordova) modeObj.mode = "history";
const router = new VueRouter({
  // mode:"history",
  ...modeObj,
  routes
})

export default router
