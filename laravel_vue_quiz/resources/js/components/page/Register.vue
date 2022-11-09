<template>
  <div>
    <main>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
              <div class="panel-heading text-center">ユーザー登録</div>

              <!-- エラー情報追加 -->
              <div class="form-group has-error" v-if="errors.length !== 0">
                <div class="alert alert-danger text-center">
                  ユーザー登録実行時にエラーが発生しました
                  <div v-for="(error, key, index) in errors" :key="index">{{error}}</div>
                </div>
              </div>
              <!-- ここまで -->

              <div class="panel-body">

                <!-- fromタグをValidationObserverに変更。ValidationObserverタグの属性にv-slot="{ invalid }"を追加、@submit.prevent="register()"を追加-->
                 <ValidationObserver
                  class="form-horizontal"
                  ref="observer"
                  action="/register"
                  id="register"
                  method="post"
                  tag="form"
                  @submit.prevent="register()"
                  v-slot="{ invalid }"
                >

                <input type="hidden" name="_token" :value="csrf" />
                <!-- ここまで -->

                  <div class="form-group">
                    <label for="name" class="col-md-4 control-label">名前</label>

                    <div class="col-md-6">

                    <!-- ここから追加 -->
                      <validation-provider name="名前" rules="required|max:20" v-slot="{ errors }">
                    <!-- ここまで追加 -->

                        <input v-model="name" name="name" type="text" class="form-control" />

                        <!-- ここから追加 -->
                        <div class="alert alert-danger" v-show="errors[0]">{{ errors[0] }}</div>
                      </validation-provider>
                      <!-- ここまで追加 -->

                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email" class="col-md-4 control-label">メールアドレス</label>

                    <div class="col-md-6">

                    <!-- ここから追加 -->
                      <validation-provider
                        name="メールアドレス"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                      <!-- ここまで追加 -->

                        <input v-model="email" name="email" type="email" class="form-control" />

                        <!-- ここから追加 -->
                        <div class="alert alert-danger" v-show="errors[0]">{{ errors[0] }}</div>
                      </validation-provider>
                      <!-- ここまで追加 -->

                    </div>
                  </div>

                  <div class="form-group">
                    <label for="password" class="col-md-4 control-label">パスワード</label>

                    <div class="col-md-6">

                    <!-- ここから追加 -->
                      <validation-provider
                        name="パスワード"
                        rules="required|min:8|confirmed:password_confirmation"
                        v-slot="{ errors }"
                      >
                      <!-- ここまで追加 -->

                        <input
                          v-model="password"
                          name="password"
                          type="password"
                          class="form-control"
                        />

                        <!-- ここから追加 -->
                        <div class="alert alert-danger" v-show="errors[0]">{{ errors[0] }}</div>
                      </validation-provider>
                      <!-- ここまで追加 -->

                    </div>
                  </div>

                  <div class="form-group">
                    <label for="password-confirm" class="col-md-4 control-label">パスワード再確認</label>

                    <div class="col-md-6">

                      <!-- ここから追加 -->
                      <validation-provider
                        name="パスワード再確認"
                        rules="required|min:8"
                        vid="password_confirmation"
                        v-slot="{ errors }"
                      >
                      <!-- ここまで追加 -->

                        <input
                          v-model="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          class="form-control"
                        />

                        <!-- ここから追加 -->
                        <div class="alert alert-danger" v-show="errors[0]">{{ errors[0] }}</div>
                      </validation-provider>
                      <!-- ここまで追加 -->

                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                      <button type="submit" class="btn btn-primary">登録</button>
                    </div>
                  </div>

                <!-- fromタグをValidationObserverに変更 -->
                </ValidationObserver>
                <!-- ここまで編集 -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>




<script>

// ここから追加
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from "vee-validate";
import { required, max, min, email, confirmed } from "vee-validate/dist/rules";
import TheHeader from "../layout/TheHeader";
import TheFooter from "../layout/TheFooter";

extend("required", {
  ...required,
  message: "{_field_}は必須です"
});
extend("email", {
  ...email,
  message: "{_field_}はメールアドレス形式で入力してください"
});
extend("min", {
  ...min,
  message: "{_field_}は最低でも{length}文字入力してください"
});
extend("max", {
  ...max,
  message: "{_field_}は最大でも{length}文字までです"
});
extend("confirmed", {
  ...confirmed,
  message: "再確認パスワードと入力が一致していません"
});
// ここまで追加

export default {

  // ここから追加
  components: {
    ValidationProvider,
    ValidationObserver
  },
  // ここまで追加

  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",

      csrf: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
    };
  },
  props: {
    errors: {
      type: Array | Object
    }
  },
  methods: {
    async register() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        document.querySelector("#register").submit();
      }
    }
  }
};
</script>
