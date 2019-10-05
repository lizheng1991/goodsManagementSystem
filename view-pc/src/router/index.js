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

Vue.use(Router)

export default new Router({
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
          component: Goods
        },
        {
          path: 'records',
          name: 'records',
          component: Records
        },
        {
          path: 'import',
          name: 'import',
          component: Import
        },
        {
          path: 'export',
          name: 'export',
          component: Export
        },
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'excel',
          name: 'excel',
          component: Excel
        }
      ]
    }
  ]
})
