<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          sort-by="id"
          class="elevation-1"
          :loading="loading"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>藥品列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="搜尋藥品"
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
@Component
export default class Pill extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("pill", { namespace: "Pill" }) pill!: Object;
  @Mutation("Pill/storePill") storePill!: Function;
  private search: string = "";
  private loading: Boolean = true;
  private headers: Object = [
    { text: "藥品號碼", value: "id" },
    { text: "藥品學名", value: "name" },
    { text: "藥品名稱", value: "synonym" },
    { text: "操作", value: "action", sortable: false }
  ];
  private desserts: Array<Object> = [];
  created() {
    this.getPillAll();
  }
  getPillAll() {
    this.axios
      .get("/medication/all")
      .then(data => data.data)
      .then(({ medications }) => {
        this.desserts = medications["entry"];
        this.loading = false;
      })
      .catch(data => {
        this.$toasted.show(`資料讀取失敗，請重新整理`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }
  deleteItem(item: any) {
    if (confirm("確定要刪除這個藥品資料嗎?")) {
      this.setOverLay(true);
      const index = this.desserts.indexOf(item);
      var order = "/medication/" + item["id"];
      this.axios
        .delete(order)
        .then(data => data.data)
        .then(({ ok }) => {
          this.desserts.splice(index, 1);
          this.setOverLay(false);
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
  showItem(item: any) {
    this.storePill(item);
    this.$router.push({
      path: "/admin/pill/pillform",
      query: { action: "show" }
    });
  }
  editItem(item: any) {
    this.storePill(item);
    this.$router.push({
      path: "/admin/pill/pillform",
      query: { action: "edit" }
    });
  }
}
</script>
