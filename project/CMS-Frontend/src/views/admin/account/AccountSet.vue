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
                      label="姓名"
                      prepend-icon="mdi-account"
                      v-model="name"
                      :rules="[() => !!name || '必須填入']"
                      clearable
                      dense
                      outlined
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
                    ></v-text-field>
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
                    ></v-textarea>
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
export default class AccountSet extends Vue {
  @State("user", { namespace: "User" }) user!: User;
  @Mutation("User/UserLoaded") userLoaded!: Function;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  private introduction: String | null = "";
  private imageUrl: String | null = "";
  private name: String = "";
  private valid: Boolean = true;
  clear() {
    this.introduction = "";
    this.imageUrl = "";
    this.name = "";
  }
  update() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .put(
          "/user",
          JSON.stringify({
            name: this.name,
            image: this.imageUrl,
            introduction: this.introduction
          })
        )
        .then(data => data.data) //
        .then(({ user }) => {
          this.$toasted.show(`更新成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.userLoaded(user);
          this.setOverLay(false);
          this.$router.push({ name: "login" });
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
  created() {
    this.getUser();
  }
  getUser() {
    this.imageUrl = this.user.image;
    this.introduction = this.user.introduction;
    this.name = this.user.name;
  }
}
</script>
