<template>
  <div>
  <!-- ヘッダーテンプを読み込み -->
    <the-header />
    <!-- エラー出力 -->
    <router-view :errors="errors" />
    <!-- コンテンツ本体。URLによって描画を切り替える -->
    <router-view/>

<!-- フッターテンプを読み込み -->
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "../layout/TheHeader";
import TheFooter from "../layout/TheFooter";

export default {
  name: "app",
  components: {
    TheHeader,
    TheFooter
  },
  props: {
    auth: {
      type: Object | Array
    },
    errors: {
      type: Object | Array
    }
  }
};
</script>
