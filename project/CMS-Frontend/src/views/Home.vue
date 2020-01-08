<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          :href="item.href"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row class="py-2"></v-row>
    <v-row justify="center">
      <v-col md="2">
        <v-card class="elevation-12">
          <RegistrationInfo />
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card class="elevation-12">
          <LastestNewsSheet />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Centered from "@/components/Centered.vue";
import RegistrationInfo from "@/components/RegistrationInfo.vue";
import LastestNewsSheet from "@/components/LastestNewsSheet.vue";
import { State, Mutation } from "vuex-class";
import { WebSetting } from "@/store/modules/webSetting/types";

@Component({ components: { RegistrationInfo, LastestNewsSheet } })
export default class Home extends Vue {
  @State("webSetting", { namespace: "WebSetting" }) webSetting!: WebSetting;
  items: Array<Object> = [];

  created() {
    this.items = this.settingImage();
  }

  settingImage() {
    var carouselImages = [{}];
    for (var i = 0; i < this.webSetting.images.length; i++) {
      carouselImages[i] = {
        src: this.webSetting.images[i],
        href: this.webSetting.URLs[i]
      };
    }
    return carouselImages;
  }
}
</script>
