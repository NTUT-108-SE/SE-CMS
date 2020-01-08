<template>
  <div>
    <v-navigation-drawer v-model="drawer" dark app clipped>
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="indigo">
              <v-img :src="user.image" v-if="iconActive"></v-img>
              <v-icon dark v-else>{{ currentIcon }}</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-title>{{ user.name }}</v-list-item-title>

          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            link
            :to="subItem.path"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense color="#fcb69f" dark :src="image">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(40,84,84,.3), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" tag="span">
        <v-toolbar-title class="mr-12 align-center"
          ><span class="title">Clinic Management System DashBoard</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-btn icon @click="Logout">
        <v-icon>mdi-exit-to-app </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { User } from "@/store/modules/user/types";

@Component
export default class Toolbar extends Vue {
  @State("image", { namespace: "Dashboard" }) image!: String;
  @State("user", { namespace: "User" }) user!: User;
  @Mutation("User/UserLogout") userLogout!: Function;
  drawer: Boolean = true;
  private iconActive = false;
  private currentIcon: string = "";
  private items: Array<Object> = [];
  // function to serve use
  Logout() {
    if (confirm("確定要離開CMS系統嗎?")) {
      this.serverLogout();
      this.userLogout();
      this.$router.push("/login");
    }
  }
  serverLogout() {
    this.axios
      .get("/logout")
      .then(data => data.data)
      .then(({ ok }) => {
        this.$toasted.show(`成功登出`, {
          type: "success",
          position: "top-right",
          duration: 3000
        });
      })
      .catch(data => {});
  }
  //
  created() {
    this.initializeIcon();
    this.initializeMenu();
  }

  initializeIcon() {
    if (this.user.image != "" && this.user.image != null) {
      this.iconActive = true;
    } else {
      if (this.user.role == "Admin") this.currentIcon = "mdi-account-circle";
      else if (this.user.role == "Doctor") this.currentIcon = "mdi-doctor";
      else this.currentIcon = "mdi-mother-nurse";
    }
  }
  initializeMenu() {
    if (this.user.role == "Admin") {
      this.items.push({
        icon: "mdi-account-group",
        title: "使用者管理",
        items: [
          { title: "瀏覽使用者帳戶", path: "/admin/account/accountall" },
          { title: "新增使用者帳戶", path: "/admin/account/accountform" },
          { title: "個人資料設定", path: "/admin/account/accountset" },
          { title: "密碼更新", path: "/admin/account/passwordupdate" }
        ]
      });
    } else {
      this.items.push({
        icon: "mdi-account-group",
        title: "使用者管理",
        items: [
          { title: "個人資料設定", path: "/admin/account/accountset" },
          { title: "密碼更新", path: "/admin/account/passwordUpdate" }
        ]
      });
    }
    this.items.push({
      icon: "mdi-account-lock",
      title: "病人資訊管理",
      items: [
        {
          title: "瀏覽病人",
          path: "/admin/patientmanagement/patientmanagement"
        },
        {
          title: "新增病人",
          path: "/admin/patientmanagement/patientmanagementform"
        }
      ]
    });
    if (this.user.role == "Admin" || this.user.role == "Doctor") {
      this.items.push({
        icon: "mdi-clipboard-text-outline",
        title: "病歷管理",
        items: [
          { title: "瀏覽病歷", path: "/admin/healthrecord/healthrecord" },
          { title: "新增病歷", path: "/admin/healthrecord/healthrecordform" }
        ]
      });
    } else {
      this.items.push({
        icon: "mdi-clipboard-text-outline",
        title: "病歷管理",
        items: [{ title: "瀏覽病歷", path: "/admin/healthrecord/healthrecord" }]
      });
    }
    this.items.push(
      {
        icon: "mdi-plus-network-outline",
        title: "掛號管理",
        items: [
          {
            title: "瀏覽掛號",
            path: "/admin/onlineregistration/onlineregistration"
          },
          {
            title: "新增掛號",
            path: "/admin/onlineregistration/onlineregistrationform"
          },
          {
            title: "掛號時間設定",
            path: "/admin/onlineregistration/onlineregistrationtimeset"
          }
        ]
      },
      {
        icon: "mdi-pill",
        title: "藥品管理",
        items: [
          { title: "瀏覽藥品", path: "/admin/pill/pill" },
          { title: "新增藥品", path: "/admin/pill/pillform" }
        ]
      },
      {
        icon: "mdi-receipt",
        title: "財務管理",
        items: [
          { title: "瀏覽收據", path: "/admin/financial/financial" },
          { title: "新增收據", path: "/admin/financial/financialform" }
        ]
      }
    );
    if (this.user.role == "Admin") {
      this.items.push({
        icon: "mdi-web",
        title: "形象網頁設定",
        items: [
          { title: "瀏覽公告", path: "/admin/webmanagement/bulletinall" },
          { title: "新增公告", path: "/admin/webmanagement/bulletinform" },
          { title: "網頁設定", path: "/admin/webmanagement/webdesign" }
        ]
      });
    } else {
      this.items.push({
        icon: "mdi-web",
        title: "形象網頁設定",
        items: [
          { title: "瀏覽公告", path: "/admin/webmanagement/bulletinall" },
          { title: "新增公告", path: "/admin/webmanagement/bulletinform" }
        ]
      });
    }
  }
}
</script>
