import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tournament from '@/components/Tournament'
import Leaderboards from '@/components/Leaderboards'
import Rounds from '@/components/Rounds'
import Course from '@/components/Course/index'
import TeeTime from '@/components/TeeTime'
import Profile from '@/components/Profile/Profile'
import ProfileEdit from '@/components/Profile/Edit'
import Scorecard from '@/components/Scorecard/index'
import UserScore from '@/components/Scorecard/UserScore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { auth: true },
    },
    {
      path: '/profile/edit/:id',
      name: 'ProfileEdit',
      component: ProfileEdit,
      props: { default: true },
      meta: { auth: true },
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
    {
      path: '/tournaments/:tournId/scorecard/:scorecardId',
      name: 'Scorecard',
      component: Scorecard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/scorecard/:scorecardId/user_scores/:scoreId',
      name: 'UserScore',
      component: UserScore,
      props: { default: true },
      meta: { auth: true }
    },
  ]
})
