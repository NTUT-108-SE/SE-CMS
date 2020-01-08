<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          sort-by="role"
          class="elevation-1"
          :loading="loading"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>使用者帳戶列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="搜尋帳號"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="editItem(item)">
              mdi-account-edit-outline
            </v-icon>
            <v-icon class="mr-2" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-icon class="mr-2" @click="showItem(item)">
              mdi-file-eye-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { User } from "@/store/modules/user/types";
@Component
export default class AccountAll extends Vue {
  @State("user", { namespace: "User" }) user!: User;
  @Mutation("User/UserLogout") userLogout!: Function;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  private loading: Boolean = true;
  private search: string = "";
  private headers: Object = [
    { text: "使用者帳號", value: "email" },
    { text: "姓名", value: "name" },
    { text: "權限", value: "role" },
    { text: "操作", value: "action", sortable: false }
  ];
  private desserts: Array<Object> = [];

  created() {
    this.getUserAll();
  }
  destroyed() {
    delete this.desserts;
  }
  getUserAll() {
    this.axios
      .get("/user/all")
      .then(data => data.data)
      .then(({ users }) => {
        this.desserts = users;
        this.loading = false;
      })
      .catch(data => {
        this.$toasted.show(`資料讀取失敗，請重新登入`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
        this.userLogout();
        this.$router.push("/login");
      });
  }
  deleteItem(item: any) {
    if (this.user.email == item["email"]) {
      this.$toasted.show(`抱歉不能刪除自己的帳號`, {
        type: "error",
        position: "top-right",
        duration: 3000
      });
    } else {
      const index = this.desserts.indexOf(item);
      if (confirm("確定要刪除這個帳號嗎?")) {
        this.setOverLay(true);
        var order = "/user/" + item["id"];
        this.axios
          .delete(order)
          .then(data => data.data)
          .then(({ ok }) => {
            this.setOverLay(false);
            this.desserts.splice(index, 1);
            this.$toasted.show(`刪除成功`, {
              type: "success",
              position: "top-right",
              duration: 3000
            });
          })
          .catch(data => {
            this.setOverLay(false);
            this.$toasted.show(`刪除失敗，請重新刪除一次`, {
              type: "error",
              position: "top-right",
              duration: 3000
            });
          });
      }
    }
  }
  showItem(item: any) {
    this.$router.push({
      path: "/admin/account/accountform",
      query: { action: "show", id: item["id"] }
    });
  }
  editItem(item: any) {
    this.$router.push({
      path: "/admin/account/accountform",
      query: { action: "edit", id: item["id"] }
    });
  }
}
</script>
