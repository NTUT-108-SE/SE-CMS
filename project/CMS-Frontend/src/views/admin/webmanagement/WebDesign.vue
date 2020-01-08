<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>網頁內容設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form class="py-3" ref="form">
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="圖片網址1"
                      prepend-icon="mdi-image"
                      v-model="images[0]"
                      :rules="[() => !!images[0] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="圖片網址2"
                      prepend-icon="mdi-image"
                      v-model="images[1]"
                      :rules="[() => !!images[1] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="圖片網址3"
                      prepend-icon="mdi-image"
                      v-model="images[2]"
                      :rules="[() => !!images[2] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="圖片網址4"
                      prepend-icon="mdi-image"
                      v-model="images[3]"
                      :rules="[() => !!images[3] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="目標網址1"
                      prepend-icon="mdi-image"
                      v-model="urls[0]"
                      :rules="[() => !!urls[0] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="目標網址2"
                      prepend-icon="mdi-image"
                      v-model="urls[1]"
                      :rules="[() => !!urls[1] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="目標網址3"
                      prepend-icon="mdi-image"
                      v-model="urls[2]"
                      :rules="[() => !!urls[2] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="目標網址4"
                      prepend-icon="mdi-image"
                      v-model="urls[3]"
                      :rules="[() => !!urls[3] || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="院所介紹"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="clinicIntroduction"
                      :rules="[() => !!clinicIntroduction || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="主治項目"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="indications"
                      :rules="[() => !!indications || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="醫師介紹"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="doctorIntroduction"
                      :rules="[() => !!doctorIntroduction || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="院所位置"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="clinicLocation"
                      :rules="[() => !!clinicLocation || '必須填入']"
                      clearable
                      dense
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn class="mx-4" dark color="primary" @click="submit">
                    <v-icon left>mdi-send-check</v-icon>
                    設定
                  </v-btn>
                  <v-btn class="mx-4" @click="close" dark color="red">
                    <v-icon left>mdi-close </v-icon>
                    關閉
                  </v-btn>
                  <v-btn class="mx-4" @click="clear" dark color="secondary">
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

@Component
export default class WebDesign extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  images: Array<String> = ["", "", "", ""];
  urls: Array<string> = ["", "", "", ""];
  clinicIntroduction: string = "";
  indications: string = "";
  doctorIntroduction: string = "";
  clinicLocation: string = "";
  title: string = "";
  created() {
    this.getWebDesignSetting();
    this.setOverLay(false);
  }

  getWebDesignSetting() {
    this.setOverLay(true);
    this.axios
      .get("/management")
      .then(data => data.data)
      .then(({ management }) => {
        this.title = management.title;
        this.images = management.images;
        this.urls = management.URLs;
        this.clinicIntroduction = this.formatingToString(
          management.ourServices
        );
        this.indications = this.formatingToString(management.description);
        this.doctorIntroduction = this.formatingToString(
          management.doctorDescription
        );
        this.clinicLocation = this.formatingToString(management.clinicAddress);
      })
      .catch(data => {
        this.$toasted.show(`資料讀取失敗，請重新登入`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      })
      .then(() => {
        this.setOverLay(false);
      });
  }

  submit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .put("/management/information", this.getSeetingJson())
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

  clear() {
    this.images = ["", "", "", ""];
    this.urls = ["", "", "", ""];
    this.clinicIntroduction = "";
    this.indications = "";
    this.doctorIntroduction = "";
    this.clinicLocation = "";
  }

  close() {
    this.$router.push({
      path: "/admin/webmanagement/bulletinall"
    });
  }

  getSeetingJson(): string {
    return JSON.stringify({
      title: this.title,
      time: new Date().toISOString().substr(0, 10),
      images: this.images,
      URLs: this.urls,
      ourServices: this.formatingContext(this.clinicIntroduction),
      description: this.formatingContext(this.indications),
      doctorDescription: this.formatingContext(this.doctorIntroduction),
      clinicAddress: this.formatingContext(this.clinicLocation)
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
