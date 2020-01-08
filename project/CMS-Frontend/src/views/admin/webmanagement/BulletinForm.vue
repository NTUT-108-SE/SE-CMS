<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form class="py-3" ref="form">
                <v-row justify="start">
                  <v-col md="6">
                    <v-text-field
                      label="公告標題"
                      prepend-icon="mdi-bulletin-board"
                      v-model="bulletinTitle"
                      :rules="[() => !!bulletinTitle || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="公告內容"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="bulletinContent"
                      :rules="[() => !!bulletinContent || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center pb-3">
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="submit"
                    v-if="buttonAction == 'add'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    送出
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="edit"
                    v-else-if="buttonAction === 'edit'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    更新
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="close"
                    dark
                    color="red"
                    v-else-if="buttonAction === 'close'"
                  >
                    <v-icon left>mdi-close </v-icon>
                    關閉
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="clear"
                    v-if="buttonAction != 'close'"
                    dark
                    color="secondary"
                  >
                    <v-icon left>mdi-autorenew</v-icon>
                    清除
                  </v-btn>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { User } from "@/store/modules/user/types";
import { BulletinInfo } from "@/store/modules/bulletinInfo/types";

@Component
export default class BulletinForm extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("user", { namespace: "User" }) user!: User;
  @State("bulletinInfo", { namespace: "BulletinInfo" })
  bulletinInfo!: BulletinInfo;
  private buttonAction: string = "add";
  private disableActive: Boolean = false;
  private formTitle: string = "新增公告";
  private bulletinID: String = "";
  bulletinContent: String = "";
  bulletinTitle: String = "";

  created() {
    if (this.$route.query.action == "show") {
      this.formTitle = "顯示公告內容";
      this.disableActive = true;
      this.buttonAction = "close";
      this.getShowData();
    } else if (this.$route.query.action == "edit") {
      this.formTitle = "更新公告內容";
      this.buttonAction = "edit";
      this.bulletinID = this.bulletinInfo.id;
      this.getShowData();
    }
    this.setOverLay(false);
  }

  getShowData() {
    this.setOverLay(true);
    this.bulletinTitle = this.bulletinInfo.title;
    this.bulletinContent = this.formatingToString(this.bulletinInfo.context);
    this.setOverLay(false);
  }

  clear() {
    this.bulletinContent = "";
    this.bulletinTitle = "";
  }

  submit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .post("/management/announcement", this.getBullentinInfo())
        .then(data => data.data)
        .then(({ ok }) => {
          this.$toasted.show(`新增成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.$router.push({
            path: "/admin/webmanagement/bulletinall"
          });
        })
        .catch(data => {
          this.$toasted.show(`新增失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        })
        .then(() => {
          this.setOverLay(false);
        });
    }
  }

  close() {
    this.$router.push({
      path: "/admin/webmanagement/bulletinall"
    });
  }

  edit() {
    var editAPT = "/management/announcement/" + this.bulletinID;
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .put(editAPT, this.getBullentinInfo())
        .then(data => data.data)
        .then(({ ok }) => {
          this.$toasted.show(`更新成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.$router.push({
            path: "/admin/webmanagement/bulletinall"
          });
        })
        .catch(data => {
          this.$toasted.show(`更新失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        })
        .then(() => {
          this.setOverLay(false);
        });
    }
  }

  getBullentinInfo(): string {
    return JSON.stringify({
      title: this.bulletinTitle,
      context: this.formatingContext(this.bulletinContent),
      author: this.user.name,
      date: new Date().toISOString().substr(0, 10)
    });
  }

  formatingContext(originalContext: any): string {
    var formatedContext = "";
    formatedContext = originalContext.replace("\n", "<br />");
    return formatedContext;
  }

  formatingToString(originalContext: any): string {
    var formatedContext = "";
    formatedContext = originalContext.replace("<br />", "\n");
    return formatedContext;
  }
}
</script>
