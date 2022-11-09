<template>
  <div>

    <!-- <the-header></the-header> -->

    <main>
      <div class="container">
        <article class="col-md-8 col-xs-12">
                    <section>
            <h2 class="quiz-question-h2">
              <img class="quiz-question__logo" src="/images/what-is-mark.png" />
              第{{ quizNumber }}問
            </h2>
            <p>{{ title }}</p>
            <div v-if="imageSrc">
              <img class="img-responsive" id="quiz-image" :src="'/images/quiz/' + imageSrc" />
            </div>
            <div class="quiz-answer__list">
              <ul>
                <li v-for="(answer, index) in answers" :key="index">
                  <a>
                    <button
                      @click="goAnswer(index + 1)"
                      :disabled="isAlreadyAnswered"
                    >{{ index + 1 }}</button>
                  </a>
                  {{ answer }}
                </li>
              </ul>
            </div>
            <div class="text-right">カテゴリー: {{ categoryName }}</div>
          </section>
          <section>
            <h2 class="quiz-correct-h2">
              <img class="quiz-correct__logo" src="/images/correct-mark.png" />正解
            </h2>
            <p>
              <button
                class="quiz-correct-answer"
                v-show="isAlreadyAnswered"
                disabled
              >{{ correctAnswerNo }}</button>
            </p>
            <button @click="goAnswer(0)" v-show="!isAlreadyAnswered">正解を表示する</button>
            <div class="alert alert-info" v-show="isCorrect">
              <strong>正解!</strong>
            </div>
            <div class="alert alert-danger" v-show="isMistake">
              <strong>不正解!</strong>
            </div>
          </section>
          <section>
            <h2 class="quiz-commentary-h2">
              <img class="quiz-commentary__logo" src="/images/commentary-mark.png" />解説
            </h2>
            <div
              class="quiz-commentary__text"
              v-show="isAlreadyAnswered"
              style="white-space:pre-wrap; word-wrap:break-word;"
            >{{ commentary }}</div>
            <button
              type="button"
              class="btn btn-primary center-block"
              @click="goNextQuiz"
              v-if="!isQuizFinish"
            >次の問題へ</button>
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal-result"
              class="center-block"
              v-show="isQuizFinish"
              @click="showResult"
            >結果を見る</button>
          </section>
        </article>

        <!-------- サイドバーのコンポーネント読み込み -------->
      <the-sidebar></the-sidebar>
      </div>
    </main>

    <!-- <the-footer></the-footer> -->

    <!-- propsとしてcorrectPercentageObjectを渡します。
ref="modal"でthis.$refs.modalの記述で、子コンポーネント(TheModal)にアクセスできるように設定 -->
    <the-modal :correctPercentageObject="correctPercentageObject" ref="modal" ></the-modal>

  </div>
</template>

<!-- ヘッダー,フッター,サイドバーのコンポーネント読み込み -->
<script>
// import TheHeader from "../layout/TheHeader";
// import TheFooter from "../layout/TheFooter";
import TheSidebar from "../layout/TheSidebar";
import TheModal from "../module/TheModal";

export default {
  components: {
    // TheHeader,
    // TheFooter,
    TheSidebar,
    TheModal
  },

  // ここからQuiz APIを呼び出す追加
  data() {
    return {
      quizData: [],
      // ここから追加
      title: "",
      imageSrc: "",
      answers: [],
      commentary: "",
      correctAnswerNo: 0,
      isCorrect: false, //正解かどうか
      isMistake: false, //間違いかどうか
      isAlreadyAnswered: false, //回答済みかどうか
      isQuizFinish: false, //クイズが終了したかどうか
      score: 0,
      quizNumber: 1,
      categoryName: "",
      // ここまで追加
      correctPercentageObject: {}
    };
  },
  mounted() {
    const categories = this.$route.query.categories;// $route.queryでQueryStringを取得
    // Axiosを使ってAPIへ問い合わせ
    this.$http.get(`/api/quiz?categories=${categories}`).then(response => {
      this.quizData = response.data;
      this.findNextQuiz(0);

    });
  },// ここまで

  // ここから追加
  methods: {
    // templateのgoAnswer(selectAnswerNum)をクリックすると、正解か不正解か未回答かで処理を切り替え、alert-infoとalert-dangerの表示・非表示を切り替える
    goAnswer(selectAnswerNum) {
      if (selectAnswerNum === 0) {
        // selectAnswerNumが0の場合は、click 「正解を表示する」ボタンのクリック alert-info、alert-dangerを非表示
        this.isCorrect = false;
        this.isMistake = false;
      } else if (selectAnswerNum === Number(this.correctAnswerNo)) {
        // 正解を押した場合 alert-infoを表示し、alert-dangerを非表示にする そしてスコアを加算する
        this.isCorrect = true;
        this.isMistake = false;
        this.score += 1;
      } else {
        // 不正解の場合 alert-infoを非表示し、alert-dangerを表示にする
        this.isMistake = true;
        this.isCorrect = false;
      }
      // 回答済みの設定をONにする 同じ問題に２回以上の回答をさせないため、そして解説を表示するため
      this.isAlreadyAnswered = true;

      // 10問以上回答している場合は、クイズを終了
      if (this.quizNumber >= 10) {
        this.endQuiz();
      }
    // goAnswerの条件分岐ここまで
    },

    findNextQuiz(quizNumber) {
      this.title = this.quizData[quizNumber].title;
      this.answers = [
        this.quizData[quizNumber].answer.answer_1,
        this.quizData[quizNumber].answer.answer_2,
        this.quizData[quizNumber].answer.answer_3,
        this.quizData[quizNumber].answer.answer_4
      ];
      this.commentary = this.quizData[quizNumber].answer.commentary;
      this.correctAnswerNo = this.quizData[quizNumber].answer.correct_answer_no;
      this.categoryName = this.quizData[quizNumber].category.name;// ここまで追加
    },

      // templateのgoNextQuizをクリックすると、クイズ番号を加算して、alert-infoとalert-danger、解説を非表示。10問以上回答している場合はクイズを強制終了するメソッドendQuiz()を実行
    goNextQuiz() {
      // 次の問題へをクリック
      if (this.quizNumber >= 10) {
        // 10問以上の場合はクイズを終了
        this.endQuiz();
      } else {
        // 次のクイズを表示し、クイズ番号を加算、alert-info、alert-danger、解説を非表示にする
        this.findNextQuiz(this.quizNumber);
        this.quizNumber += 1;
        this.isCorrect = false;
        this.isMistake = false;
        this.isAlreadyAnswered = false;
      }
    },
    endQuiz() {
      this.isQuizFinish = true;
      this.answerNo = "-";
      this.isAlreadyAnswered = true;

      // クイズの結果を作成し、this.$refs.modal.render()で子コンポーネント(TheModal)に設定した、render()methodを呼び出す設定追加
      this.correctPercentageObject = {
        correctScore: this.score,
        mistakeScore: 10 - this.score
      };
    },
    showResult() {
      this.$refs.modal.render();
    }
    // ここまで

  }
};
</script>
