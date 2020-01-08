import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { HealthRecordState } from "./types";
import { RootState } from "@/store/types";

export const state: HealthRecordState = {
  healthrecord: undefined,
  error: false
};

const namespaced: boolean = true;
export const HealthRecord: Module<HealthRecordState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
