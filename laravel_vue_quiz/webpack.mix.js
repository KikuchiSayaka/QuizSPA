let mix = require('laravel-mix');

// resources/js/app.jsを素のJSにコンパイルしてpublic/jsに入れる
//クイズ画面用のresources/js/quiz.jsを素のJSにコンパイルしてpublic/jsに入れる
//app.jsも素のJSにコンパイルしてpublic/jsに入れる
//resources/sass/app.scssに記述したSass(Scss)ファイルをpublic/css配下にcssとしてコンパイルする。コンパイルにはnode-sassを使う。
mix.js('resources/js/home.js', 'public/js')
  .js('resources/js/quiz.js', 'public/js')
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css', {
    implementation: require('node-sass')
  });

//files:で監視対象のファイルを設定。今回はpublic/**/*.*配下にある、全てのファイルを監視。変更あった時点で自動リロードを行う。proxy:で監視する対象サーバーを設定
mix.browserSync({
  files: [
    "public/**/*.*"
  ],
  proxy: 'http://localhost:8000'
});