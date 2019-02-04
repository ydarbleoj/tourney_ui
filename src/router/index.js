import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tournament from '@/components/Tournament'
import TournamentAdmin from '@/components/Tournament/Admin/index'
import PlayerScorecards from '@/components/Tournament/Admin/PlayerScorecards'
import TournamentCreate from '@/components/Tournament/Create/index'
import TournamentDashboard from '@/components/Tournament/Dashboard'
import AcceptInvite from '@/components/Tournament/AcceptInvite'
import Leaderboards from '@/components/Leaderboards'
import Rounds from '@/components/Rounds'
import Course from '@/components/Course/index'
import Profile from '@/components/Profile/Profile'
import ProfileEdit from '@/components/Profile/Edit'
import Scorecard from '@/components/Scorecard/index'
import UserScore from '@/components/Scorecard/UserScore'
import Stats from '@/components/Stats/index'

Vue.use(Router)

const checkForUser = (to, from, next) => {
  if (!localStorage.default_auth_token) {
    next()
  } else {
    next('/profile')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      redirect: { name: 'route-name' }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        checkForUser(to, from, next)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        checkForUser(to, from, next)
      }
    },
    {
      path: '/tournament/accept-invitation/:token',
      name: 'AcceptInvite',
      component: AcceptInvite,
      meta: { auth: true },
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
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.name === 'AcceptInvite')) {
    if (!localStorage.default_auth_token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router;