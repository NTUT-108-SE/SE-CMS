<template>
  <v-app id="login">
    <v-content id="login container">
      <v-container
        :style="{
          'background-image':
            'linear-gradient(0deg, rgba(192,192,217,0.2) 11%, rgba(97,83,87,0.5) 100%), url(' +
            image +
            ')'
        }"
        class="fill-height"
        fluid
      >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>CMS login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    autofocus
                    label="Email"
                    name="email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="onLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

@Component
export default class Login extends Vue {
  @Mutation("User/UserLoaded") userLoaded!: Function;
  @State("image", { namespace: "Dashboard" }) image!: String;
  @State("user", { namespace: "User" }) user!: Object;

  private email: string = "";
  private password: string = "";
  private overlay: Boolean = false;
  beforeRouteEnter(to: any, from: any, next: (vm: any) => void) {
    next((vm: any) => {
      if (vm.user != undefined) {
        vm.$router.push("/admin");
      }
    });
  }
  onLogin() {
    this.overlay = true;
    this.axios
      .post(
        "/login",
        JSON.stringify({
          email: this.email,
          password: this.password
        })
      )
      .then(data => data.data)
      .then(({ user }) => {
        this.overlay = false;
        this.$toasted.show(`Login success!! Welcom ${user.name}`, {
          type: "success",
          position: "top-right",
          duration: 3000
        });
        this.userLoaded(user);

        this.$router.push({ name: "admin" });
      })
      .catch(data => {
        this.overlay = false;
        this.$toasted.show(`Login failed!!`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }
}
</script>
