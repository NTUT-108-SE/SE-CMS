<template>
  <v-app>
    <Header />
    <v-content>
      <transition>
        <router-view></router-view>
      </transition>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({ components: { Header, Footer } })
export default class Layout extends Vue {
  @Mutation("WebSetting/storeWebSetting") storeWebSetting!: Function;
  previousElement: Object = "";

  created() {
    this.getWebDesignSetting();
  }

  getWebDesignSetting() {
    this.axios
      .get("/management")
      .then(data => data.data)
      .then(({ management }) => {
        this.storeWebSetting(management);
      })
      .catch(data => {
        this.$toasted.show(`資料讀取失敗，請重新登入`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }
}
</script>
