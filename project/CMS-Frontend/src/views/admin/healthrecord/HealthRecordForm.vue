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
              <v-form class="py-3" ref="form" v-model="valid" lazy-validation>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="身分證"
                      prepend-icon="mdi-account-badge-horizontal-outline"
                      v-model="identifier"
                      :rules="[
                        () => !!identifier || '必須填入',
                        () =>
                          checkTaiwanID() ||
                          '身分證必須是10個字元且不符合台灣規則'
                      ]"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm || buttionAction == 'edit'"
                      v-on:input="checkID"
                      @click:clear="clearIDAndName"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="姓名"
                      prepend-icon="mdi-account"
                      v-model="name"
                      :rules="[() => !!name || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="
                        activeForm ||
                          controlNameActive ||
                          buttionAction == 'edit'
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="病況描述"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="conditionDescription"
                      :rules="[() => !!conditionDescription || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="藥物治療描述"
                      prepend-icon="mdi-file-document-edit-outline"
                      v-model="medicationDescription"
                      :rules="[() => !!medicationDescription || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="submit"
                    v-if="buttionAction == 'add'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    送出
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    dark
                    color="primary"
                    @click="edit"
                    v-if="buttionAction == 'edit'"
                  >
                    <v-icon left>mdi-send-check</v-icon>
                    更新
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="close"
                    dark
                    color="red"
                    v-if="buttionAction == 'close'"
                  >
                    <v-icon left>mdi-close </v-icon>
                    關閉
                  </v-btn>
                  <v-btn
                    class="mx-12"
                    @click="clear"
                    v-if="buttionAction == 'add' || buttionAction == 'edit'"
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
import { HealthRecord } from "@/store/modules/healthrecord/types";
@Component
export default class HealthRecordForm extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("healthrecord", { namespace: "HealthRecord" })
  healthrecord!: HealthRecord;
  @Mutation("HealthRecord/deleteHealthRecord") deleteHealthRecord!: Function;
  private formTitle: string = "新增病歷";
  private identifier: string = "";
  private name: string = "";
  private conditionDescription: string = "";
  private medicationDescription: string = "";
  private valid: Boolean = true;
  private activeForm: Boolean = false;
  private buttionAction: string = "add";
  private tempID: number = 0;
  private controlNameActive: Boolean = false;
  clearIDAndName() {
    this.name = "";
    this.controlNameActive = false;
  }
  checkTaiwanID() {
    var reg = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/; //身份證的正規表示式
    if (reg.test(this.identifier)) {
      var englishAlphabetBasicTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var conversionTaiwanNum = [
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "34",
        "18",
        "19",
        "20",
        "21",
        "22",
        "35",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "32",
        "30",
        "31",
        "33"
      ];
      var findIDFirstAlphabet = englishAlphabetBasicTable.indexOf(
        this.identifier.charAt(0)
      );
      var tempuserid =
        conversionTaiwanNum[findIDFirstAlphabet] + this.identifier.substr(1, 9); //若此身份證號若是A123456789=>10123456789
      var num = Number(tempuserid.charAt(0)) * 1;
      for (var i = 1; i <= 9; i++) {
        num += Number(tempuserid.charAt(i)) * (10 - i);
      }
      num += Number(tempuserid.charAt(10)) * 1;
      if (num % 10 == 0) return true;
      return false;
    }
    return false;
  }
  checkID() {
    if (this.identifier.length == 10) {
      this.setOverLay(true);
      var order = "/patient/" + this.identifier;
      this.axios
        .get(order)
        .then(data => data.data)
        .then(({ patient }) => {
          this.name = patient["family"] + patient["given"];
          this.tempID = patient["id"];
          this.controlNameActive = true;
          this.setOverLay(false);
        })
        .catch(data => {
          this.setOverLay(false);
          this.controlNameActive = false;
          this.$toasted.show(`讀取不到身分證對應的名字`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
  created() {
    if (this.$route.query.action == "show") {
      this.formTitle = "顯示病歷";
      this.getShowData();
      this.activeForm = true;
      this.buttionAction = "close";
    } else if (this.$route.query.action == "edit") {
      this.formTitle = "更新病歷";
      this.getShowData();
      this.buttionAction = "edit";
    }
  }
  clear() {
    if (this.buttionAction == "edit") {
      this.conditionDescription = "";
      this.medicationDescription = "";
    } else if (this.buttionAction == "add") {
      this.conditionDescription = "";
      this.medicationDescription = "";
      this.identifier = "";
      this.name = "";
      this.controlNameActive = false;
    }
  }
  getShowData() {
    this.setOverLay(true);
    this.identifier = String(this.healthrecord.identifier);
    this.name = String(this.healthrecord.name);
    this.conditionDescription = String(this.healthrecord.code);
    this.medicationDescription = String(this.healthrecord.medication);
    this.setOverLay(false);
  }
  close() {
    this.$router.push({
      path: "/admin/healthrecord/healthrecord"
    });
  }
  edit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      var order = "/healthrecord/" + this.$route.query.id;
      this.axios
        .put(
          order,
          JSON.stringify({
            code: this.conditionDescription,
            medication: this.medicationDescription,
            identifier: this.identifier,
            name: this.name
          })
        )
        .then(data => data.data)
        .then(({ ok }) => {
          this.setOverLay(false);
          this.$toasted.show(`更新成功`, {
            type: "success",
            position: "top-right",
            duration: 3000
          });
          this.$router.push({
            path: "/admin/healthrecord/healthrecord"
          });
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`更新失敗，請重新確認輸入資料`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
  submit(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.pullHealthRecord();
    }
  }
  pullHealthRecord() {
    this.setOverLay(true);
    var order = "/healthrecord";
    this.axios
      .post(
        order,
        JSON.stringify({
          patientId: this.tempID,
          code: this.conditionDescription,
          medication: this.medicationDescription,
          identifier: this.identifier,
          name: this.name
        })
      )
      .then(data => data.data)
      .then(({ ok }) => {
        this.setOverLay(false);
        this.$toasted.show(`新增成功`, {
          type: "success",
          position: "top-right",
          duration: 3000
        });
        this.$router.push({
          path: "/admin/healthrecord/healthrecord"
        });
      })
      .catch(data => {
        this.setOverLay(false);
        this.$toasted.show(`新增失敗，請重新確認輸入資料`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }
}
</script>
