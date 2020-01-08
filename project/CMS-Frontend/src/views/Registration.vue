<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col md="2">
        <v-card class="elevation-12 mb-5">
          <v-list rounded>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="selectAction in actionList"
                :key="selectAction.title"
                @click="
                  isRegisterStatus(selectAction.action);
                  actionName = selectAction.title;
                "
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="selectAction.title"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card class="elevation-12">
          <RegistrationInfo />
        </v-card>
      </v-col>

      <v-col md="6">
        <v-card class="elevation-12">
          <v-card-title class="py-2" color="grey">
            {{ actionName }}
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-form class="py-3" ref="form" v-if="!isShowUserRegistrationIndex">
            <v-row justify="center">
              <v-col md="6">
                <v-text-field
                  label="身分證字號"
                  prepend-icon="mdi-account-card-details-outline"
                  v-model="identify"
                  placeholder="ex:A000000000"
                  :rules="[
                    () => !!identify || '必須填入',
                    () =>
                      checkTaiwanID() || '身分證必須是10個字元且不符合台灣規則'
                  ]"
                  clearable
                  dense
                  outlined
                  rounded
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="center" v-if="!isCheckRegistrationIndexStatus">
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
                      label="出生日期"
                      prepend-icon="mdi-calendar-blank"
                      readonly
                      v-on="on"
                      dense
                      outlined
                      rounded
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="birthDate"
                    no-title
                    scrollable
                    min="1900-01-01"
                    :max="getThisTime()"
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

            <v-row justify="center" v-if="!isCheckRegistrationIndexStatus">
              <v-col md="6">
                <v-menu
                  ref="treatMenu"
                  v-model="treatMenu"
                  :close-on-content-click="false"
                  :return-value.sync="treatDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="treatDate"
                      label="看診日期"
                      prepend-icon="mdi-calendar-blank"
                      readonly
                      v-on="on"
                      dense
                      outlined
                      rounded
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="treatDate"
                    no-title
                    scrollable
                    :min="getThisTime()"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="treatMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.treatMenu.save(treatDate)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row justify="center" class="pb-3">
              <v-btn
                rounded
                class="mx-12"
                dark
                color="primary"
                @click="submit"
                v-if="action == 'add'"
              >
                <v-icon left>mdi-send-check</v-icon>
                送出
              </v-btn>
              <v-btn
                rounded
                class="mx-12"
                @click="clear"
                v-if="action == 'add'"
                dark
                color="secondary"
              >
                <v-icon left>mdi-autorenew</v-icon>
                清除
              </v-btn>
            </v-row>
          </v-form>
          <v-card-text
            class="font-weight-bold"
            v-if="isShowUserRegistrationIndex"
          >
            <p
              class="subtitle-2 font-weight-bold"
              v-if="isGetuserRegistrationInfos"
            >
              以下為您的看診資訊: <br />
              病患姓名: {{ userRegistrationInfos[0].name }}<br />
            </p>
            <p
              class="subtitle-2 font-weight-bold"
              v-if="!isGetuserRegistrationInfos"
            >
              查無掛號資訊
            </p>
            <div
              v-for="oneOfUserRegistrationInfo in userRegistrationInfos"
              :key="oneOfUserRegistrationInfo.id"
            >
              <p>
                看診日期: {{ oneOfUserRegistrationInfo.registrationDate }}<br />
                掛號號碼: {{ oneOfUserRegistrationInfo.order }}<br />
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RegistrationInfo from "@/components/RegistrationInfo.vue";

@Component({ components: { RegistrationInfo } })
export default class Registration extends Vue {
  private isCheckRegistrationIndexStatus: Boolean = false;
  private isShowUserRegistrationIndex: Boolean = false;
  private isGetuserRegistrationInfos: Boolean = false;
  actionName: string = "";
  action: string = "add";
  treatDate: string = "";
  birthDate: string = "1900-01-01";
  treatMenu: Boolean = false;
  birthMenu: Boolean = false;
  identify: string = "";
  returnInfomation: object = {};
  userRegistrationInfos: Array<object> = [];
  actionList: Array<Object> = [
    { title: "掛號", action: "register" },
    { title: "掛號查詢", action: "check" }
  ];

  created() {
    this.treatDate = this.getThisTime();
    this.actionName = Object(this.actionList[0]).title;
  }

  submit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.userRegistrationInfos = [];
      if (this.isCheckRegistrationIndexStatus)
        this.searchUserRegistrationInfo();
      else this.register();
    }
  }

  clear() {
    this.identify = "";
    this.birthDate = "1900-01-01";
  }

  isRegisterStatus(action: any) {
    this.isShowUserRegistrationIndex = false;
    this.isCheckRegistrationIndexStatus = action == "check";
  }

  getThisTime() {
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzoffset).toISOString().substr(0, 10);
  }

  allTheFormInfomation(): string {
    var formInfo = {
      identifier: this.identify,
      registrationDate: this.treatDate,
      birthDate: this.birthDate
    };
    return JSON.stringify(formInfo);
  }

  register() {
    var api = "/registration";
    this.axios
      .post(api, this.allTheFormInfomation())
      .then(data => data.data)
      .then(({ registration }) => {
        this.showUserRegistrationIndex([registration]);
      })
      .catch(data => {
        this.showUserRegistrationIndex([]);
        this.$toasted.show(`掛號失敗`, {
          type: "error",
          position: "top-right",
          duration: 3000
        });
      });
  }

  searchUserRegistrationInfo() {
    var api = "/registration/identifier?identifier=" + this.identify;
    this.axios
      .get(api)
      .then(data => data.data)
      .then(({ registrations }) => {
        this.showUserRegistrationIndex(registrations);
      })
      .catch(data => {
        this.showUserRegistrationIndex([]);
      });
  }

  showUserRegistrationIndex(registrations: any) {
    this.userRegistrationInfos = registrations;
    this.isShowUserRegistrationIndex = true;
    if (this.userRegistrationInfos.length == 0)
      this.isGetuserRegistrationInfos = false;
    else this.isGetuserRegistrationInfos = true;
  }
  checkTaiwanID() {
    var reg = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/; //身份證的正規表示式
    if (reg.test(this.identify)) {
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
        this.identify.charAt(0)
      );
      var tempuserid =
        conversionTaiwanNum[findIDFirstAlphabet] + this.identify.substr(1, 9); //若此身份證號若是A123456789=>10123456789
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
}
</script>
