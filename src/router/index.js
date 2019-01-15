import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tournament from '@/components/Tournament'
import TournamentAdmin from '@/components/Tournament/Admin/index'
import PlayerScorecards from '@/components/Tournament/Admin/PlayerScorecards'
import TournamentCreate from '@/components/Tournament/Create/index'
import TournamentDashboard from '@/components/Tournament/Dashboard'
import Leaderboards from '@/components/Leaderboards'
import Rounds from '@/components/Rounds'
import Course from '@/components/Course/index'
import Profile from '@/components/Profile/Profile'
import ProfileEdit from '@/components/Profile/Edit'
import Scorecard from '@/components/Scorecard/index'
import UserScore from '@/components/Scorecard/UserScore'
import Stats from '@/components/Stats/index'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // meta: { auth: false, redirect: '/profile' },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
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
      path: '/tournaments_dashboard',
      name: 'Dashboard',
      component: TournamentDashboard,
      meta: { auth: true }
    },
    {
      path: '/tournament',
      name: 'Tournament',
      component: Tournament,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/create',
      name: 'TournamentCreate',
      component: TournamentCreate,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/admin',
      name: 'TournamentAdmin',
      component: TournamentAdmin,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin'}, }}
    },
    {
      path:'/tournament/admin/player-scorecards',
      name: 'PlayerScorecards',
      component: PlayerScorecards,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin' }, }}
    }
    // {
    //   path: '/tournaments/:id/rounds',
    //   name: 'Rounds',
    //   component: Rounds,
    //   props: { default: true }
    // },
    // {
    //   path: '/tournaments/:id/stats',
    //   name: 'Stats',
    //   component: Stats,
    //   props: { default: true }
    // },
    // {
    //   path: '/tournaments/:id/course/:id',
    //   name: 'Course',
    //   component: Course,
    //   props: { default: true }

    // },
    // {
    //   path: '/tournaments/:tournId/tee_time/:id',
    //   name: 'TeeTime',
    //   component: TeeTime,
    //   props: { default: true }

    // },
    // {
    //   path: '/tournaments/:tournId/scorecard/:scorecardId',
    //   name: 'Scorecard',
    //   component: Scorecard,
    //   props: { default: true },
    //   meta: { auth: true }
    // },
    // {
    //   path: '/scorecard/:scorecardId/user_scores/:scoreId',
    //   name: 'UserScore',
    //   component: UserScore,
    //   props: { default: true },
    //   meta: { auth: true }
    // },
  ]
})
