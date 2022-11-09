<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Information;

class InformationController extends Controller
{
    public function index()
    {
    //Informationモデルからid降順で全てのデータを取得する
        $informations = Information::orderby('id', 'desc')->get();
    // 取得したデータ($information)をそのまま返却。すると、LaravelではControllerで変数を返却すると自動的にJSONに変換して表示する
        return $informations;
    }
}

