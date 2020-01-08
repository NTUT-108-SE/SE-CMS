import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { WebSettingState } from "./types";
import { RootState } from "@/store/types";

export const state: WebSettingState = {
  webSetting: {
    URLs: [{}, {}, {}, {}],
    images: [{}, {}, {}, {}],
    clinicAddress: "",
    description: "",
    doctorDescription: "",
    ourServices: "",
    title: ""
  },
  isEmpty: true
};

const namespaced: boolean = true;
export const WebSetting: Module<WebSettingState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
