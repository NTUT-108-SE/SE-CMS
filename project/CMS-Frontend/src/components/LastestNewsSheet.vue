<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">發布日期</th>
          <th class="text-left">標題</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ formattingDate(item.date) }}</td>
          <td>
            <a @click="gotoSelectedNews(item)">{{ item.title }}</a>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component
export default class LastestNewsSheet extends Vue {
  @Mutation("User/UserLogout") userLogout!: Function;
  search: string = "";
  headers: Object = [
    {
      text: "更新日期",
      align: "left",
      sortable: false,
      value: "name"
    },
    { text: "標題", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Iron (%)", value: "iron" }
  ];
  desserts: object = [];

  created() {
    this.getAllAnnouncements();
  }

  getAllAnnouncements() {
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

  formattingDate(date: string): String {
    return new String(date).substr(0, 10);
  }

  gotoSelectedNews(item: any) {
    this.$router.push({
      path: "/News",
      query: { id: item.id }
    });
  }
}
</script>
