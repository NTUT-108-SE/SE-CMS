<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="bulletinNum"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>公告列表</v-toolbar-title>
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
export default class BulletinAll extends Vue {
  @Mutation("BulletinInfo/storeBulletinInfo") storeBulletinInfo!: Function;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @Mutation("User/UserLogout") userLogout!: Function;
  search: string = "";
  headers: Object = [
    { text: "公告日期", align: "left", value: "date" },
    { text: "標題", value: "title" },
    { text: "點閱率", value: "ctr" },
    { text: "操作", value: "action", sortable: false }
  ];
  desserts: Array<object> = [];

  created() {
    this.getBullentinAll();
    this.setOverLay(false);
  }

  getBullentinAll() {
    this.axios
      .get("/management/announcements")
      .then(data => data.data)
      .then(({ announcements }) => {
        this.desserts = announcements.entry;
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
    var selcetedBullentinID = item.id;
    const selectedBullentinIndex = this.desserts.indexOf(item);
    var deletApi = "/management/announcement/" + selcetedBullentinID;
    if (confirm("確定要刪除這個公告嗎?")) {
      this.setOverLay(true);
      this.axios
        .delete(deletApi)
        .then(data => data.data)
        .then(({ ok }) => {
          this.desserts.splice(selectedBullentinIndex, 1);
          this.$toasted.show(`刪除成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
        })
        .catch(data => {
          this.$toasted.show(`刪除失敗，請重新刪除一次`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        })
        .then(() => {
          this.setOverLay(false);
        });
    }
  }

  showItem(item: any) {
    this.storeBulletinInfo(item);
    this.$router.push({
      path: "/admin/webmanagement/bulletinform",
      query: { action: "show" }
    });
  }

  editItem(item: any) {
    this.storeBulletinInfo(item);
    this.$router.push({
      path: "/admin/webmanagement/bulletinform",
      query: { action: "edit" }
    });
  }

  formattingDate(date: string): String {
    return new String(date).substr(0, 10);
  }
}
</script>
