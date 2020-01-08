<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="8">
        <v-card class="elevation-12">
          <LastestNewsSheet v-if="!isShowNewsContext" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LastestNewsSheet from "@/components/LastestNewsSheet.vue";

@Component({ components: { LastestNewsSheet } })
export default class LastestNews extends Vue {
  isShowNewsContext: Boolean = false;
}
</script>
