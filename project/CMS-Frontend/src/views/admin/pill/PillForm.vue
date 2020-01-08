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
                      label="藥品學名"
                      prepend-icon="mdi-pill"
                      v-model="name"
                      :rules="[() => !!name || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="藥品名稱"
                      prepend-icon="mdi-pill"
                      v-model="synonym"
                      :rules="[() => !!synonym || '必須填入']"
                      clearable
                      dense
                      outlined
                      :disabled="activeForm"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="12">
                    <v-textarea
                      label="藥品成份"
                      prepend-icon="mdi-file-document-box-outline"
                      v-model="ingredient"
                      :rules="[() => !!ingredient || '必須填入']"
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
                      label="副作用"
                      prepend-icon="mdi-file-document-box-outline"
                      v-model="contraindication"
                      :rules="[() => !!contraindication || '必須填入']"
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
                      label="適應症"
                      prepend-icon="mdi-file-document-box-outline"
                      v-model="patientCharacteristics"
                      :rules="[() => !!patientCharacteristics || '必須填入']"
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
                      label="投藥指引"
                      prepend-icon="mdi-file-document-box-outline"
                      v-model="dosage"
                      :rules="[() => !!dosage || '必須填入']"
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
import { Pill } from "@/store/modules/pill/types";
@Component
export default class PillForm extends Vue {
  @Mutation("Loader/setOverLay") setOverLay!: Function;
  @State("pill", { namespace: "Pill" })
  pill!: Pill;
  @Mutation("Pill/deletePill") deletePill!: Function;
  private formTitle: string = "新增藥品";
  private valid: Boolean = true;
  private activeForm: Boolean = false;
  private buttionAction: string = "add";
  //
  private contraindication: string = "";
  private dosage: string = "";
  private ingredient: string = "";
  private name: string = "";
  private patientCharacteristics: string = "";
  private synonym: string = "";
  created() {
    if (this.$route.query.action == "show") {
      this.formTitle = "顯示藥品";
      this.getShowData();
      this.activeForm = true;
      this.buttionAction = "close";
    } else if (this.$route.query.action == "edit") {
      this.formTitle = "更新藥品";
      this.getShowData();
      this.buttionAction = "edit";
    }
  }
  getShowData() {
    this.setOverLay(true);
    this.contraindication = String(this.pill.contraindication);
    this.dosage = String(this.pill.dosage);
    this.ingredient = String(this.pill.ingredient);
    this.name = String(this.pill.name);
    this.patientCharacteristics = String(this.pill.patientCharacteristics);
    this.synonym = String(this.pill.synonym);
    this.setOverLay(false);
  }
  clear() {
    this.contraindication = "";
    this.dosage = "";
    this.ingredient = "";
    this.name = "";
    this.patientCharacteristics = "";
    this.synonym = "";
  }
  close() {
    this.$router.push({
      path: "/admin/pill/pill"
    });
  }
  edit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setOverLay(true);
      var order = "/medication/" + this.pill.id;
      this.axios
        .put(
          order,
          JSON.stringify({
            contraindication: this.contraindication,
            dosage: this.dosage,
            ingredient: this.ingredient,
            name: this.name,
            patientCharacteristics: this.patientCharacteristics,
            synonym: this.synonym
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
            path: "/admin/pill/pill"
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
      this.setOverLay(true);
      var order = "/medication";
      this.axios
        .post(
          order,
          JSON.stringify({
            contraindication: this.contraindication,
            dosage: this.dosage,
            ingredient: this.ingredient,
            name: this.name,
            patientCharacteristics: this.patientCharacteristics,
            synonym: this.synonym
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
            path: "/admin/pill/pill"
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
}
</script>
