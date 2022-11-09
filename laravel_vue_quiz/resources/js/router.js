import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/page/Home'
import Quiz from './components/page/Quiz'
import Login from './components/page/Login'
import Register from './components/page/Register'

Vue.use(Router)

export default new Router({
  mode: 'history', // SPAのURLにはhistoryモード(#ハッシュが付かないタイプを使う)
  routes: [
    {
      // URL「/」にリクエストが来たら、Homeコンポーネントを使うという意味
      path: '/',
      name: 'home',
      component: Home
    },
    {
      // URL「/quiz」にリクエストが来たら、Quizコンポーネントを使うという意味
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      // URL「/login」にリクエストが来たら、loginコンポーネントを使うという意味
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      //URL「/register」にリクエストが来たら、Registerコンポーネントを呼び出すように設定
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})

