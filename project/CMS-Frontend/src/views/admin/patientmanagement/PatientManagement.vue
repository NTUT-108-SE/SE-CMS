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
              <v-toolbar-title>病人列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="搜尋病人"
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
export default class PatientManagement extends Vue {
  @State("user", { namespace: "User" }) user!: User;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @Mutation("User/UserLogout") userLogout!: Function;
  @Mutation("Patient/storePatient") storePatient!: Function;
  @State("patient", { namespace: "Patient" }) patient!: Object;
  private loading: Boolean = true;
  search: string = "";
  headers: Object = [
    {
      text: "病人號碼",
      align: "left",
      value: "id"
    },
    { text: "身分證", value: "identifier" },
    { text: "姓氏", value: "family" },
    { text: "名字", value: "given" },
    { text: "性別", value: "gender" },
    { text: "出生年月日", value: "birthDate" },
    { text: "電話", value: "phone" },
    { text: "操作", value: "action", sortable: false }
  ];
  desserts: Array<Object> = [];
  created() {
    this.getPatientAll();
    this.setOverLay(false);
  }

  getPatientAll() {
    this.axios
      .get("/patient/all")
      .then(data => data.data)
      .then(({ patients }) => {
        this.desserts = patients.entry;
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
    var selectedPatientID = item.id;
    const index = this.desserts.indexOf(item);
    if (confirm("確定要刪除這個病人資料嗎?")) {
      this.setOverLay(true);
      var api = "/patient/" + selectedPatientID;
      this.axios
        .delete(api)
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
    this.storePatient(item);
    this.$router.push({
      path: "/admin/patientmanagement/patientmanagementform",
      query: {
        action: "show",
        id: item["id"]
      }
    });
  }
  editItem(item: any) {
    this.storePatient(item);
    this.$router.push({
      path: "/admin/patientmanagement/patientmanagementform",
      query: {
        action: "edit",
        id: item["id"]
      }
    });
  }
}
</script>
