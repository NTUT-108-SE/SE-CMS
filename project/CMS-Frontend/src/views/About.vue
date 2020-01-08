<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="2">
        <v-card class="pa-2 elevation-12" tile>
          <v-list rounded>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="selectDescript in items"
                :key="selectDescript.title"
                @click="containText = selectDescript"
              >
                <v-list-item-icon>
                  <v-icon v-text="selectDescript.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="selectDescript.title"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col md="6">
        <v-card class="pa-2 elevation-12" tile>
          <v-card-title class="headline mb-1">{{
            containText.title
          }}</v-card-title>
          <div v-html="containText.context">
            {{ containText.context }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { WebSetting } from "@/store/modules/webSetting/types";

@Component
export default class About extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("webSetting", { namespace: "WebSetting" }) webSetting!: WebSetting;
  containText: Object = {};
  clinicIntroduction: String = "";
  description: String = "";
  doctorDescription: String = "";
  clinicAddress: String = "";
  items: Array<object> = [];

  created() {
    this.items = [
      {
        title: "院所介紹",
        icon: "mdi-hospital-building",
        context: this.webSetting.ourServices
      },
      {
        title: "主治項目",
        icon: "mdi-stethoscope",
        context: this.webSetting.description
      },
      {
        title: "醫師介紹",
        icon: "mdi-doctor",
        context: this.webSetting.doctorDescription
      },
      {
        title: "院所位置",
        icon: "mdi-map-marker",
        context: this.webSetting.clinicAddress
      }
    ];
    this.containText = this.items[0];
    this.setOverLay(false);
  }
}
</script>
