import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Goods from '../components/functions/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
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
        }
      ]
    }
  ]
})
