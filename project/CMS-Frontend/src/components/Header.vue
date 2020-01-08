<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light">Clinic Management System</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/" tag="span">
      <v-btn text>主畫面</v-btn>
    </router-link>

    <router-link to="LastestNews" tag="span">
      <v-btn text>最新資訊</v-btn>
    </router-link>

    <router-link to="Registration" tag="span">
      <v-btn text>掛號</v-btn>
    </router-link>

    <router-link to="About" tag="span">
      <v-btn text>關於本院</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>
