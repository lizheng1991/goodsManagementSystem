import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Goods from '../components/functions/Goods'
import Records from '../components/functions/Records'
import Import from '../components/functions/Import'
import Export from '../components/functions/Export'
import User from '../components/functions/User'
import Excel from '../components/functions/Excel'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/goods'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods,
          meta: {
            auth: true
          }
        },
        {
          path: 'records',
          name: 'records',
          component: Records,
          meta: {
            auth: true
          }
        },
        {
          path: 'import',
          name: 'import',
          component: Import,
          meta: {
            auth: true
          }
        },
        {
          path: 'export',
          name: 'export',
          component: Export,
          meta: {
            auth: true
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {
            auth: true
          }
        },
        {
          path: 'excel',
          name: 'excel',
          component: Excel,
          meta: {
            auth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth) {
    let auth = store.getters.auth;
    if(auth) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router
