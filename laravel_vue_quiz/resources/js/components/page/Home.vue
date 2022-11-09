<template>
  <div>
    <!-- <the-header></the-header> -->
    <main>
      <div class="container">
        <article class="col-md-8 col-xs-12">
          <section class="home-quiz__introduction">
            <h2 class="home-quiz__introduction-h2">
              <img class="home-quiz__introduction-h2-logo" src="/images/what-is-mark.png" />4 Answers Quizとは?
            </h2>
            <p>4 Answers Quizとはビジネスマナーから一般常識に至るまで様々なクイズを4択で出題するWEBアプリです。</p>
            <p>何度もトライしてみて正解率100%を目指してみてください。</p>
          </section>
          <section class="home-quiz__setting">
            <h2 class="home-quiz__setting-h2">
              <img class="home-quiz__setting-h2-logo" src="/images/directory-icon.png" />出題設定
            </h2>
            <form>
              <!-- ここでカテゴリーのテーブルのname内容をv-forで繰り返し呼び出し、checkboxを生成する -->
              <label v-for="(cate, index) in category" :key="index">
                <input type="checkbox" v-model="categories" :value="cate.id" />{{cate.name}}&ensp;
              </label>
            <!-- ここまで -->
              <div class>
                全項目チェック
                <button type="button" name="check_all" id="check-all" value="1">ON</button>
                <button type="button" name="check_all_off" id="check-all-off" value="1">OFF</button>
              </div>
              <button type="submit" class="btn btn-primary" @click.stop.prevent="goQuiz()">出題開始</button>
              <!-- <input type="hidden" name="_token" value /> -->
            </form>
          </section>
          <section class="home-quiz__ranking">
            <h2 class="home-quiz__ranking-h2">
              <img class="home-quiz__ranking-h2-logo" src="/images/graph-icon.png" />ランキング
            </h2>
            <div>
              <label>
                <input class="ranking-radio" type="radio" name="ranking-radio" value="1" checked />総合
              </label>
              <label>
                <input class="ranking-radio" type="radio" name="ranking-radio" value="2" />今月
              </label>
              <label>
                <input class="ranking-radio" type="radio" name="ranking-radio" value="3" />今週
              </label>
            </div>
            <div class="home_quiz__ranking-chart">

        <!-- グラフのコンポーネントBarChart.vue読み込み -->
        <bar-chart></bar-chart>


</div>
          </section>
          <section class="home__notice">
            <h2 class="home__notice-h2">
              <img class="home__notice-h2-logo" src="/images/news-icon.png" />お知らせ情報
            </h2>
            <!-- お知らせのデータベース読み込み -->
            <!-- informatin配列について繰り返し処理を行う -->
            <dl v-for="(info, index) in information" :key="index">
              <dt>{{info.created_at}}</dt>
              <dd>{{info.information}}</dd>
            </dl>
          </section>
        </article>
<!-- サイドバー読み込み -->
      <the-sidebar></the-sidebar>


      </div>
    </main>
   <!-- <the-footer></the-footer> -->
  </div>
</template>


<!-- ヘッダー,フッター,サイドバー,グラフのコンポーネント読み込み -->
<script>
// import TheHeader from "../layout/TheHeader";
// import TheFooter from "../layout/TheFooter";
import TheSidebar from "../layout/TheSidebar";
import BarChart from "../module/BarChart";
// ImportファイルTheHeader.vueとTheFooter.vueをコンポーネントとして使えるように定義
export default {
  components: {
    // TheHeader,
    // TheFooter,
    TheSidebar,
    BarChart
  },


// ここからSPA化
  data() {
    // categoriesのデフォルト値を設定します。ここでは[1]配列の1とします。
    //お知らせ情報をデータベースから読み込む
    //カテゴリーをデータベースから読み込む
    return {
      categories: [1],
      information :[],
      category: [],
    };
  },

  mounted() {
    //カテゴリーAPI読み込み
    this.$http.get("/api/category").then(response => {
      this.category = response.data;
    });
    //お知らせ情報API読み込み
    this.$http.get("/api/information").then(response => {
      this.information = response.data;
    });
  },

  methods: {
    goQuiz() { // @click.stop.preventで設定したgoQuiz()をここで定義します
      this.$router.push("/quiz?categories=" + this.categories); // this.$router.pushを使うことで、画面リロードすることなくURLを変更できます。
    }
  }
// ここまでSPA化

};
</script>
