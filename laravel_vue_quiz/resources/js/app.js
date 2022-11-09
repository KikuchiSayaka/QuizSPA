// require('./bootstrap');

import Vue from 'vue'
import router from './router.js'
import SocialSharing from 'vue-social-sharing'
import axios from 'axios' // どこからでもAxiosを呼び出すことができる設定
import MainPage from './components/page/MainPage' // MainPage.vueの読み込み設定

import jQuery from "jquery"; //BootstrapのModalを呼び出すためには、Bootstrap(JavaScriptファイル)とjQueryが必要
window.$ = window.jQuery = jQuery;
require('bootstrap');

Vue.prototype.$http = axios; // どこからでもAxiosを呼び出すことができる設定


Vue.use(SocialSharing);

new Vue({
  router: router, // routerにはrouter.jsファイルを設定

  // ここからMainPage.vueのMainPageコンポーネントを<app />の記述で読み込めるように設定追加
  components: {
    app: MainPage
  }
  // ここまでMainPage.vueの読み込み追加

 }).$mount('#app') // routerを適用する要素を設定(マウント)
