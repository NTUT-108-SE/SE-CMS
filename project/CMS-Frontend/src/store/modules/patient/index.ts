import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { PatientState } from "./types";
import { RootState } from "@/store/types";

export const state: PatientState = {
  patient: undefined,
  isEmpty: true
};

const namespaced: boolean = true;
export const Patient: Module<PatientState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
