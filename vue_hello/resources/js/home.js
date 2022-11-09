import Vue from 'vue'
import App from './components/page/Home'

// ホーム画面のソーシャルシェアをスクラッチで作らず、vue-social-sharingを使う
import SocialSharing from 'vue-social-sharing';
Vue.use(SocialSharing);


new Vue({
  el: 'app', // 「el」はアプリケーションを紐付ける要素のセレクタです
  components: {
    app: App //使用するコンポーネントの名称と使うコンポーネントを指定（app:名称, App(./components/HelloWorld)使うコンポーネント）を指定します
  }
})

// コンポーネントとは？：HTML, CSS, JavaScriptなどが1つのセットになったVue.jsの部品