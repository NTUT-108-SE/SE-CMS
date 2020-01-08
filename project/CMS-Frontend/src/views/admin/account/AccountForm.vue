<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form class="py-3" ref="form" v-model="valid" lazy-validation>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="電子郵件"
                      prepend-icon="mdi-account"
                      :rules="[
                        () => !!email || '必須填入電子郵件',
                        () => /.+@.+\..+/.test(email) || '電子郵件格式必須正確'
                      ]"
                      v-model="email"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="請輸入密碼"
                      type="password"
                      prepend-icon="mdi-lock-reset"
                      v-model="userPassword"
                      :rules="[
                        () => !!userPassword || '必須填入',
                        () =>
                          userPassword.length >= 8 || '密碼介於8-20字元之間',
                        () =>
                          userPassword.length <= 20 || '密碼介於8-20字元之間'
                      ]"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="姓名"
                      prepend-icon="mdi-account"
                      v-model="name"
                      :rules="[() => !!name || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="圖片網址"
                      prepend-icon="mdi-image"
                      v-model="imageUrl"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-select
                      prepend-icon="mdi-account-multiple-check"
                      v-model="permissionText"
                      :items="permission"
                      :rules="[() => !!permissionText || '必須填入']"
                      label="權限"
                      dense
                      outlined
                      :disabled="activeForm"
                    ></v-select>
                  </v-col>
                  <v-col md="6">
                    <v-select v-show="false"></v-select>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="帳號描述"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="introduction"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="submit"
                    v-if="buttionAction == 'add'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    送出
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="edit"
                    v-if="buttionAction == 'edit'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    更新
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="close"
                    dark
                    color="red"
                    v-if="buttionAction != 'add'"
                  >
                    <v-icon left>mdi-close </v-icon>
                    關閉
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="clear"
                    v-if="buttionAction == 'add'"
                    dark
                    color="secondary"
                  >
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
@Component
export default class AccountForm extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  private formTitle: string = "新增帳號";
  private activeForm: Boolean = false;
  private email: string = "";
  private userPassword: string = "";
  private name: string = "";
  private introduction: string = "";
  private imageUrl: string = "";
  private buttionAction: string = "add";
  private permissionText: string = "";
  private permission: Object = ["醫生", "護理師", "管理員"];
  private valid: Boolean = true;
  created() {
    if (this.$route.query.action == "show") {
      this.formTitle = "顯示帳號資料";
      this.getShowData();
      this.activeForm = true;
      this.buttionAction = "close";
    } else if (this.$route.query.action == "edit") {
      this.formTitle = "更新帳號權限";
      this.buttionAction = "edit";
      this.getShowData();
    }
  }
  getShowData() {
    this.setOverLay(true);
    var order = "/user/" + this.$route.query.id;
    this.axios
      .get(order)
      .then(data => data.data)
      .then(({ user }) => {
        this.email = user.email;
        this.userPassword = "noshowpassword";
        if (user.role == "Admin") this.permissionText = "管理員";
        if (user.role == "Doctor") this.permissionText = "醫生";
        if (user.role == "Nurse") this.permissionText = "護理師";
        this.name = user.name;
        this.introduction =
          user.introduction === null || user.introduction === ""
            ? "無帳號描述"
            : user.introduction;
        this.imageUrl =
          user.image === null || user.image === "" ? "無照片" : user.image;
        this.setOverLay(false);
      })
      .catch(data => {
        this.setOverLay(false);
        this.$toasted.show(`資料讀取失敗，請重新整理一次`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }
  close() {
    this.$router.push({
      path: "/admin/account/accountall"
    });
  }
  submit(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      var role;
      if (this.permissionText == "管理員") role = "Admin";
      else if (this.permissionText == "醫生") role = "Doctor";
      else role = "Nurse";
      this.axios
        .post(
          "/user",
          JSON.stringify({
            email: this.email,
            password: this.userPassword,
            name: this.name,
            role: role,
            image: this.imageUrl,
            introduction: this.introduction
          })
        )
        .then(data => data.data)
        .then(({ ok }) => {
          this.$toasted.show(`新增成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.setOverLay(false);
          this.$router.push({
            path: "/admin/account/accountall"
          });
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`新增失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }

  edit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      var order = "/user/" + this.$route.query.id;
      var role;
      if (this.permissionText == "管理員") role = "Admin";
      else if (this.permissionText == "醫生") role = "Doctor";
      else role = "Nurse";
      this.axios
        .post(
          order,
          JSON.stringify({
            role: role
          })
        )
        .then(data => data.data)
        .then(({ ok }) => {
          this.$toasted.show(`更新成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.setOverLay(false);
          this.$router.push({
            path: "/admin/account/accountall"
          });
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`新增失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
  clear() {
    this.email = "";
    this.name = "";
    this.imageUrl = "";
    this.permissionText = "";
    this.introduction = "";
  }
}
</script>
