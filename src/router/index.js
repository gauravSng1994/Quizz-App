import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuestionList from '../views/QuestionList';
import Quiz from '../views/Quizz';
import Vuetify from "../views/Vuetify";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
