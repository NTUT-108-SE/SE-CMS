<template>
  <v-footer :dark="dark ? true : false">
    <v-col class="text-center" cols="12">
      <span class>
        &copy; {{ new Date().getFullYear() }} —
        <strong>
          NTUT-SELAB
          <v-btn text href="https://github.com/NTUT-108-SE" target="_blank">
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
        </strong>
      </span>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class layout extends Vue {
  @Prop() dark!: Boolean;
}
</script>
