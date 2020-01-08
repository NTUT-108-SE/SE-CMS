<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="8">
        <v-card class="elevation-12">
          <v-card-title class="display-1">{{ articleTitle }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-subtitle>
            發布日期: {{ articlePostDate }}<br />發布人員: {{ author }}
          </v-card-subtitle>
          <v-card-text class="text--primary" v-html="articleContext">
            {{ articleContext }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class New extends Vue {
  private articleID: String = "";
  articleTitle: String = "";
  articlePostDate: String = "";
  author: String = "";
  articleContext: String = "";

  created() {
    this.clearArticle();
    this.articleID = String(this.$route.query.id);
    this.getAnnouncement();
  }

  getAnnouncement() {
    var getArticleAPI = "/management/announcement/" + this.articleID;
    this.axios
      .get(getArticleAPI)
      .then(data => data.data)
      .then(({ announcement }) => {
        this.setArticle(announcement);
      })
      .catch(data => {
        this.$toasted.show(`讀取失敗`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
        this.$router.push("/LastestNews");
      });
  }

  clearArticle() {
    this.setArticle({ title: "", date: "", author: "", context: "" });
    this.articleID = "";
  }

  setArticle(announcement: any): void {
    this.articleTitle = announcement.title;
    this.articlePostDate = new String(announcement.date).substr(0, 10);
    this.author = announcement.author;
    this.articleContext = announcement.context;
  }
}
</script>
