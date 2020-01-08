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
                      :disabled="disableActive || disableActiveByEdit"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-menu
                      ref="birthMenu"
                      v-model="birthMenu"
                      :close-on-content-click="false"
                      :return-value.sync="birthDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="birthDate"
                          label="出生年月日"
                          prepend-icon="mdi-calendar-blank"
                          readonly
                          v-on="on"
                          dense
                          outlined
                          :disabled="disableActive || disableActiveByEdit"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="birthDate"
                        no-title
                        scrollable
                        min="1919-01-01"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="birthMenu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.birthMenu.save(birthDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="姓氏"
                      prepend-icon="mdi-account"
                      v-model="firstName"
                      :rules="[() => !!firstName || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="名字"
                      prepend-icon="mdi-account"
                      v-model="lastName"
                      :rules="[() => !!lastName || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-select
                      v-model="genderText"
                      prepend-icon="mdi-gender-non-binary"
                      :items="gender"
                      item-text="text"
                      item-value="state"
                      label="性別"
                      required
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-select>
                  </v-col>
                  <v-col md="6">
                    <v-select
                      v-model="maritalText"
                      prepend-icon="mdi-heart-multiple"
                      :items="maritalStatus"
                      :rules="[() => !!maritalText || '必須填入']"
                      label="婚姻"
                      required
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="6">
                    <v-text-field
                      label="電話"
                      prepend-icon="mdi-phone-forward"
                      v-model="telephone"
                      :rules="[
                        () => !!telephone || '必須填入',
                        () => telephone.length <= 20 || '電話最多輸入20個字元'
                      ]"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-textarea
                      label="地址"
                      prepend-icon="mdi-home-edit"
                      v-model="address"
                      :rules="[() => !!address || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="disableActive"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
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
import { Patient } from "@/store/modules/patient/types";
@Component
export default class PatientManagementForm extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("patient", { namespace: "Patient" }) patient!: Patient;
  @Mutation("Patient/deletePatient") deletePatient!: Function;
  private valid: Boolean = true;
  private disableActive: Boolean = false;
  private disableActiveByEdit: Boolean = false;
  private formTitle: string = "新增病人";
  private editAPI: string = "";
  private birthMenu: boolean = false;
  identifier: string = "";
  firstName: string = "";
  lastName: string = "";
  genderText: string = "";
  maritalText: string = "";
  telephone: string = "";
  address: string = "";
  birthDate: string = "";
  buttonAction: string = "add";
  gender: Object = [
    { text: "男", state: "male" },
    { text: "女", state: "female" },
    { text: "其他", state: "other" },
    { text: "不願提供", state: "unknown" }
  ];
  maritalStatus: Object = ["未婚", "已婚", "離婚", "喪偶", "不願提供"];
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
  clear() {
    if (this.disableActiveByEdit) {
      this.firstName = "";
      this.lastName = "";
      this.genderText = "";
      this.maritalText = "";
      this.telephone = "";
      this.address = "";
    } else {
      this.identifier = "";
      this.firstName = "";
      this.lastName = "";
      this.genderText = "";
      this.maritalText = "";
      this.telephone = "";
      this.address = "";
      this.birthDate = "";
    }
  }
  created() {
    if (this.$route.query.action == "show") {
      this.formTitle = "顯示病人資料";
      this.disableActive = true;
      this.buttonAction = "close";
      this.getShowData();
    } else if (this.$route.query.action == "edit") {
      this.formTitle = "更新病人資料";
      this.disableActiveByEdit = true;
      this.buttonAction = "edit";
      this.getShowData();
    }
    this.setOverLay(false);
  }

  getShowData() {
    this.address = String(this.patient.address);
    this.birthDate = String(this.patient.birthDate);
    this.firstName = String(this.patient.family);
    this.genderText = String(this.patient.gender);
    this.lastName = String(this.patient.given);
    this.identifier = String(this.patient.identifier);
    this.maritalText = String(this.patient.maritalStatus);
    this.telephone = String(this.patient.phone);
  }

  submit(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.axios
        .post(
          "/patient",
          JSON.stringify({
            address: this.address,
            birthDate: this.birthDate,
            family: this.firstName,
            gender: this.genderText,
            given: this.lastName,
            identifier: this.identifier,
            maritalStatus: this.maritalText,
            phone: this.telephone
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
            path: "/admin/patientmanagement/patientmanagement"
          });
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`新增失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }

  close() {
    this.$router.push({
      path: "/admin/patientmanagement/patientmanagement"
    });
  }
  edit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      this.editAPI = "/patient/" + this.$route.query.id;
      this.axios
        .put(
          this.editAPI,
          JSON.stringify({
            address: this.address,
            birthDate: this.birthDate,
            family: this.firstName,
            gender: this.genderText,
            given: this.lastName,
            identifier: this.identifier,
            maritalStatus: this.maritalText,
            phone: this.telephone
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
            path: "/admin/patientmanagement/patientmanagement"
          });
        })
        .catch(data => {
          this.setOverLay(false);
          this.$toasted.show(`更新失敗`, {
            type: "error",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
}
</script>
