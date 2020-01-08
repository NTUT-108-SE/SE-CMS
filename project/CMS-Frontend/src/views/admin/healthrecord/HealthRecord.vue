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
              <v-toolbar-title>病歷列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="搜尋病歷"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" v-if="iconActive[0]" @click="editItem(item)">
              mdi-account-edit-outline
            </v-icon>
            <v-icon class="mr-2" v-if="iconActive[1]" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-icon class="mr-2" v-if="iconActive[2]" @click="showItem(item)">
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
export default class HealthRecord extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @Mutation("HealthRecord/storeHealthRecord") storeHealthRecord!: Function;
  @State("healthrecord", { namespace: "HealthRecord" }) healthrecord!: Object;
  @State("user", { namespace: "User" }) user!: User;
  private search: string = "";
  private loading: Boolean = true;
  private headers: Object = [
    { text: "病歷號碼", value: "id" },
    { text: "身分證", value: "identifier" },
    { text: "姓名", value: "name" },
    { text: "看診日期", value: "date" },
    { text: "操作", value: "action", sortable: false }
  ];
  private desserts: Array<Object> = [];
  private iconActive: Array<Boolean> = [true, true, true];
  created() {
    if (this.user.role == "Nurse") {
      this.iconActive[0] = false;
      this.iconActive[1] = false;
    }
    this.axios
      .get("/healthrecord/all")
      .then(data => data.data)
      .then(({ healthrecords }) => {
        this.desserts = healthrecords["entry"];
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
    if (confirm("確定要刪除這個病歷嗎?")) {
      this.setOverLay(true);
      const index = this.desserts.indexOf(item);
      var order = "/healthrecord/" + item["id"];
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
    this.storeHealthRecord(item);
    this.$router.push({
      path: "/admin/healthrecord/healthrecordform",
      query: { action: "show" }
    });
  }
  editItem(item: any) {
    this.storeHealthRecord(item);
    this.$router.push({
      path: "/admin/healthrecord/healthrecordform",
      query: { action: "edit", id: item["id"] }
    });
  }
}
</script>
