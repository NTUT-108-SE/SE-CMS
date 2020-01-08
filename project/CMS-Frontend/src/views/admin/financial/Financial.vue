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
              <v-toolbar-title>收據列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="搜尋收據"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
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
export default class Financial extends Vue {
  @State("financial", { namespace: "Financial" }) financial!: Object;
  @Mutation("Financial/storeFinancial") storeFinancial!: Function;
  private search: string = "";
  private loading: Boolean = true;
  private headers: Object = [
    { text: "收據號碼", value: "id" },
    { text: "身分證", value: "identifier" },
    { text: "姓名", value: "name" },
    { text: "建立日期", value: "date" },
    { text: "操作", value: "action", sortable: false }
  ];
  private desserts: Array<Object> = [];
  created() {
    this.getFinancialAll();
  }
  getFinancialAll() {
    this.axios
      .get("/invoice/all")
      .then(data => data.data)
      .then(({ invoices }) => {
        this.desserts = invoices["entry"];
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
  showItem(item: any) {
    this.storeFinancial(item);
    this.$router.push({
      path: "/admin/financial/financialform",
      query: { action: "show" }
    });
  }
}
</script>
