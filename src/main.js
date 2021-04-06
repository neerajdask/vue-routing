import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ]
    }, // our-domain.com/teams => TeamsList
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      }.beforeEnter((to, from, next) => {
        console.log('ROUTE LEVEL GAURD');
        console.log(to, from);
        next();
      })
    },

    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  console.log('GLOBAL GAURD');
  console.log(to, from);
  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
