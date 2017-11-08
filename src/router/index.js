import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import TournamentCourses from '@/components/TournamentCourses'
import Tournament from '@/components/Tournament'
import Leaderboards from '@/components/Leaderboards'
import Rounds from '@/components/Rounds'

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
      path: '/tournaments/:id/courses',
      name: 'TournamentCourses',
      component: TournamentCourses,
      props: { default: true }

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
    }
  ]
})
