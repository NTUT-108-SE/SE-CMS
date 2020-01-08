<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>個人資料更新</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form class="py-3" ref="form" v-model="valid" lazy-validation>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="請輸入舊的密碼"
                      type="password"
                      prepend-icon="mdi-account"
                      v-model="oldUserPassword"
                      :rules="[() => !!oldUserPassword || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-select v-show="false"></v-select>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="請輸入新的密碼"
                      type="password"
                      prepend-icon="mdi-lock-reset"
                      v-model="newUserPassword"
                      :rules="[
                        () => !!newUserPassword || '必須填入',
                        () =>
                          newUserPassword.length >= 8 || '密碼介於8-20字元之間',
                        () =>
                          newUserPassword.length <= 20 || '密碼介於8-20字元之間'
                      ]"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="請重複輸入新的密碼"
                      type="password"
                      prepend-icon="mdi-lock-reset"
                      v-model="againNewUserPassword"
                      :rules="[
                        () => !!againNewUserPassword || '必須填入',
                        () =>
                          againNewUserPassword.length >= 8 ||
                          '密碼介於8-20字元之間',
                        () =>
                          againNewUserPassword.length <= 20 ||
                          '密碼介於8-20字元之間',
                        () =>
                          againNewUserPassword == newUserPassword ||
                          '與新的密碼不一致'
                      ]"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn class="mx-4" dark color="primary" @click="update">
                    <v-icon left>mdi-send-check</v-icon>
                    更新
                  </v-btn>
                  <v-btn class="mx-4" @click="clear" dark color="secondary">
                    <v-icon left>mdi-autorenew</v-icon>
                    清除
                  </v-btn>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { User } from "@/store/modules/user/types";
@Component
export default class PasswordUpdate extends Vue {
  @State("user", { namespace: "User" }) user!: User;
  @Mutation("User/UserLogout") userLogout!: Function;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  private oldUserPassword: string = "";
  private againNewUserPassword: string = "";
  private newUserPassword: string = "";
  private valid: Boolean = true;

  clear() {
    this.oldUserPassword = "";
    this.newUserPassword = "";
    this.againNewUserPassword = "";
  }
  update() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .post(
          "/user/change_password",
          JSON.stringify({
            old_password: this.oldUserPassword,
            password: this.newUserPassword
          })
        )
        .then(data => data.data)
        .then(({ ok }) => {
          this.serverLogout();
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`更新失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
  serverLogout() {
    this.axios
      .get("/logout")
      .then(data => data.data)
      .then(({ ok }) => {
        this.$toasted.show(`更新成功 ，請重新登入`, {
          type: "success",
          position: "top-right",
          duration: 3000
        });
        this.userLogout();
        this.setOverLay(false);
        this.$router.push("/login");
      })
      .catch(data => {});
  }
}
</script>
