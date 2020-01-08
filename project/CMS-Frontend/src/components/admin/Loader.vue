<template>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class Loader extends Vue {
  @State("overlay", { namespace: "Loader" }) overlay!: Boolean;
  @Mutation("Loader/setOverLay") setOverLay!: Function;
}
</script>
