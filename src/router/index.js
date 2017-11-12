import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Tournament from '@/components/Tournament'
import Leaderboards from '@/components/Leaderboards'
import Rounds from '@/components/Rounds'
import Course from '@/components/Course'
import TeeTime from '@/components/TeeTime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/tournaments',
      name: 'Tournament',
      component: Tournament
    },
    {
      path: '/tournaments/:id/leaderboards',
      name: 'Leaderboards',
      component: Leaderboards,
      props: { default: true }
    },
    {
      path: '/tournaments/:id/rounds',
      name: 'Rounds',
      component: Rounds,
      props: { default: true }
    },
    {
      path: '/tournaments/:id/course/:id',
      name: 'Course',
      component: Course,
      props: { default: true }

    },
    {
      path: '/tournaments/:id/tee_time/:id',
      name: 'TeeTime',
      component: TeeTime,
      props: { default: true }

    },
  ]
})
