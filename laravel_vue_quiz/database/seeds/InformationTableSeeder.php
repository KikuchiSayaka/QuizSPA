<?php

use Illuminate\Database\Seeder;

class InformationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    // ダミーデータの設定。ここから追加
        // informationsテーブルのデータを全て削除するコード
        DB::table('informations')->truncate();

        // informationsテーブルにデータを追加
        DB::table('informations')->insert([
        'information' => '最初のお知らせです',
        'created_at' => now(),
        'updated_at' => now(),
        ]);
    // ここまで追加
    }
}
