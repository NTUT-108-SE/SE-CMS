import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { FinancialState } from "./types";
import { RootState } from "@/store/types";

export const state: FinancialState = {
  financial: undefined,
  error: false
};

const namespaced: boolean = true;
export const Financial: Module<FinancialState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
