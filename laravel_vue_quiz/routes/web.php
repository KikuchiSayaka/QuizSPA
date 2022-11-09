<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

    //ルートの参照先指定
Route::get('/', function () {
    return view('index');
});

    //クイズ回答画面の参照先指定
Route::get('/quiz', function () {
    return view('quiz.index');
});

    // ログイン画面の参照先を指定
    Route::get('/login', function () {
    return view('auth.login.index');
  });

    //会員登録画面の参照先指定
    Route::get('/register', function () {
        return view('auth.register.index');
});

Route::post('/register', 'Auth\RegisterController@register');

// Laravelでは、デフォでログイン機能を持ってる。以下を追加するだけで使える
Route::post('/login', 'Auth\LoginController@login');