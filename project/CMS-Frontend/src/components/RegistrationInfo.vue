<template>
  <div>
    <v-card-title class="py-2" color="grey">
      看診資訊
    </v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-row>
      <v-card-text class="py-2 px-6">
        今日掛號人數： {{ totleRegistration }}
      </v-card-text>
    </v-row>

    <v-row>
      <v-card-text class="py-2 px-6 pb-4">
        目前看診進度： {{ currentRegistration }}
      </v-card-text>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class RegistrationInfo extends Vue {
  totleRegistration: string = "";
  currentRegistration: string = "";

  created() {
    this.getClinicRegistrationInfo();
  }

  getClinicRegistrationInfo() {
    this.axios
      .get("/registration/order")
      .then(data => data)
      .then(({ data }) => {
        this.totleRegistration = data.total;
        this.currentRegistration = data.order;
      });
  }
}
</script>
