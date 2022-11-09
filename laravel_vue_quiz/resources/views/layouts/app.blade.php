<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/css/app.css" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}"> {{-- postする際に必要な値 --}}
    <title>4 Answers Quiz 4択クイズ&クイズ徹底解説</title>
  </head>
  <body>
    <body>
      <div id="app">
        <!-- ログイン済みであれば、ログインユーザー情報を取得、ログイン済みでない場合、空の配列を渡す -->
        <app :errors="{{ $errors }}" :auth="{{ Auth::user() ?? '[]' }}"/>
      </div>
      <script src="/js/app.js"></script>
  </body>
</html>

