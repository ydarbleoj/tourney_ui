import { createRouter, createWebHistory } from 'vue-router'
import { usePageTransitionStore } from '@/store/pageTransition';
import ScorecardHole from "../components/scorecards/Hole.vue"

const checkForUser = (to, from, next) => {
  console.log(localStorage.default_auth_tokens)
  if (!localStorage.default_auth_token) {
    next()
  } else {
    next('/profile')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Login.vue"),
      beforeEnter: (to, from, next) => {
        checkForUser(to, from, next)
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../components/profile/Profile.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: "/profile/edit/:id",
      name: "ProfileEdit",
      component: () => import("../components/profile/Edit.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: "/profile/:id/scorecards",
      name: "ProfileScorecards",
      component: () => import("../components/profile/Scorecards.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: "/profile/:id/scorecards/:scorecard_id",
      name: "ProfileScorecard",
      component: () => import("../components/profile/Scorecard.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: "/profile/:id/scorecard/:scorecard_id/scores",
      name: "ProfileScoreList",
      component: () => import("../components/profile/ScoreList.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: "/tournament_records",
      name: "TournamentRecords",
      component: () => import("../components/TournamentRecords.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: "/tournament_records/:id",
      name: "TournamentRecord",
      component: () => import("../components/TournamentRecord.vue"),
      props: { default: true },
      meta: { auth: true },
    },
    {
      path: '/tournament/:id',
      component: () => import("../components/TournamentWrapper.vue"),
      children: [
        {
          path: "",
          name: "Tournament",
          component: () => import("../components/Tournament.vue"),
          props: { default: true },
          meta: { auth: true }
        },
        {
          path: "/tournament/:id/breakdown",
          name: "TournamentBreakdown",
          component: () => import("../components/courses/BreakdownPage.vue"),
          props: { default: true },
          meta: { auth: true }
        },
        {
          path: "/tournament/:id/mudder_cup",
          name: "MudderCup",
          component: () => import("../components/muddercup/MainPage.vue"),
          props: { default: true },
          meta: { auth: true }
        },
        {
          path: "/tournament/:id/gallery",
          name: "TournamentGallery",
          component: () => import("../components/images/TournamentGallery.vue"),
          props: { default: true },
          meta: { auth: true }
        },
        {
          path: "/tournament/:id/discussion",
          name: "TournamentDiscussion",
          component: () => import("../components/discussions/TournamentPage.vue"),
          props: { default: true },
          meta: { auth: true }
        }
      ]
    },
    {
      path: '/tournament/:id/leaderboards/stroke',
      name: "StrokeLeaderboard",
      component: () => import("../components/leaderboards/stroke/index.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/stroke/:leaderboard_id',
      name: "StrokePlayerPage",
      component: () => import("../components/leaderboards/stroke/PlayerPage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/putting',
      name: "PuttingLeaderboard",
      component: () => import("../components/leaderboards/putting/index.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/putting/:leaderboard_id',
      name: "PuttingPlayerPage",
      component: () => import("../components/leaderboards/putting/PlayerPage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/skins',
      name: "SkinsLeaderboard",
      component: () => import("../components/leaderboards/skins/index.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/leaderboards/skins/:leaderboard_id',
      name: "SkinsPlayerPage",
      component: () => import("../components/leaderboards/skins/PlayerPage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: "/tournament/:id/leaderboards/money_list",
      name: "MoneyList",
      component: () => import("../components/leaderboards/money_list/MainPage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: "/tournament/:id/leaderboards/money_list/:leaderboard_id",
      name: "MoneyPlayerPage",
      component: () => import("../components/leaderboards/money_list/PlayerPage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: '/tournament/:id/scorecard/:scorecard_id',
      name: "Scorecard",
      component: () => import("../components/scorecards/ScorecardPage.vue"),
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
      path: "/tournament/:id/round_info/:round_id",
      name: "RoundInfo",
      component: () => import("../components/courses/CoursePage.vue"),
      props: { default: true },
      meta: { auth: true }
    },
    {
      path: "/tournament/:id/mudder_cup/team/:team_id",
      name: "MudderCupTeam",
      component: () => import("../components/muddercup/TeamPage.vue"),
      props: { default: true },
      meta: { auth: true }
    }
  ]
})

// beforeEnter: (to, from, next) => {
//   checkForUser(to, from, next)
// }
export default (app) => {
  app.router = router;

  app.use(router);
}