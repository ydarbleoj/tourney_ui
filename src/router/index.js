import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tournament from '@/components/Tournament'
import TournamentAdmin from '@/components/Tournament/Admin/index'
import AdminPlayerPage from '@/components/Tournament/Admin/Player/index'
import AdminServicePage from '@/components/Tournament/Admin/Services/index'
import PlayerServicePage from '@/components/Tournament/Admin/Services/PlayerPage'
import PlayerScorecards from '@/components/Tournament/Admin/PlayerScorecards'
import TournamentCreate from '@/components/Tournament/Create/index'
import TournamentDashboard from '@/components/Tournament/Dashboard'
import AcceptInvite from '@/components/Tournament/AcceptInvite'
import StrokeLeaderboard from '@/components/Leaderboards/Stroke/index'
import StrokePlayerPage from '@/components/Leaderboards/Stroke/PlayerPage'
import PuttingLeaderboard from '@/components/Leaderboards/Putting/index'
import PuttingPlayerPage from '@/components/Leaderboards/Putting/PlayerPage'
import SkinsLeaderboard from '@/components/Leaderboards/Skins/index'
import SkinsPlayerPage from '@/components/Leaderboards/Skins/PlayerPage'
import TeamLeaderboard from '@/components/Leaderboards/Team/index'
import TeamPage from '@/components/Leaderboards/Team/Page/index'
import Course from '@/components/Course/index'
import ResetPassword from '@/components/ResetPassword'
import ForgotPassword from '@/components/ForgotPassword'
import Profile from '@/components/Profile/Profile'
import ProfileEdit from '@/components/Profile/Edit'
import Scorecard from '@/components/Scorecard/index'
import ScorecardHole from '@/components/Scorecard/Hole'
import TeamScorecard from '@/components/TeamScorecard/index'
import TeamScorecardHole from '@/components/TeamScorecard/Hole'
import UserScore from '@/components/Scorecard/UserScore'
import Summary from '@/components/Stats/Course/index'

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
      path: '/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset_password/:token',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { auth: false }
    },
    {
      path: '/tournament/accept-invitation/:token',
      name: 'AcceptInvite',
      component: AcceptInvite,
      meta: { auth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { auth: true }
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
      path: '/tournament/:id',
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
      path: '/tournament/:id/admin',
      name: 'TournamentAdmin',
      component: TournamentAdmin,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin'}, }}
    },
    {
      path: '/tournament/:id/admin/:leaderboard_id',
      name: 'AdminPlayerPage',
      component: AdminPlayerPage,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin'}, }}
    },
    {
      path: '/tournament/:id/admin/services',
      name: 'AdminServicePage',
      component: AdminServicePage,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin'}, }}
    },
    {
      path: '/tournament/:id/admin/services/:leaderboard_id',
      name: 'PlayerServicePage',
      component: PlayerServicePage,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin'}, }}
    },
    {
      path:'/tournament/admin/player-scorecards',
      name: 'PlayerScorecards',
      component: PlayerScorecards,
      props: { default: true },
      meta: { auth: { role: 'admin', redirect: { name: 'admin' }, }}
    },
    {
      path: '/tournament/:id/leaderboards/stroke',
      name: "StrokeLeaderboard",
      component: StrokeLeaderboard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/stroke/:leaderboard_id',
      name: "StrokePlayerPage",
      component: StrokePlayerPage,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/putting',
      name: "PuttingLeaderboard",
      component: PuttingLeaderboard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/putting/:leaderboard_id',
      name: "PuttingPlayerPage",
      component: PuttingPlayerPage,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/skins',
      name: "SkinsLeaderboard",
      component: SkinsLeaderboard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/skins/:leaderboard_id',
      name: "SkinsPlayerPage",
      component: SkinsPlayerPage,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/team',
      name: "TeamLeaderboard",
      component: TeamLeaderboard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/team/:team_id',
      name: "TeamPage",
      component: TeamPage,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/course/:course_id',
      name: "Course",
      component: Course,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/scorecard/:scorecard_id',
      name: "Scorecard",
      component: Scorecard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/scorecard/:id/hole/:number',
      name: "ScorecardHole",
      component: ScorecardHole,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/team_scorecard/:team_id',
      name: "TeamScorecard",
      component: TeamScorecard,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/team_scorecard/:id/hole/:number',
      name: "TeamScorecardHole",
      component: TeamScorecardHole,
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/summary',
      name: "Summary",
      component: Summary,
      props: { default: true },
      meta: { auth: true, transitionName: 'pageTransition' }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.default_auth_token && to.path !== '/login' && to.path !== '/forgot_password') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
export default router;
