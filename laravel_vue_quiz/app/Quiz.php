<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
// ここから追加
use App\Answer;
use App\Category;
// ここまで追加



class Quiz extends Model
{

  // ここから追加
  protected $table = 'quizzes'; // テーブル名を指定

  public function answer()
  {
    return $this->hasOne('App\Answer', 'id', 'answers_id');
  }
  public function category()
  {
    return $this->hasOne('App\Category', 'id', 'categories_id');
  // ここまで追加
  }
}
