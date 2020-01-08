import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { LoaderState } from "./types";
import { RootState } from "@/store/types";

export const state: LoaderState = {
  overlay: false
};

const namespaced: boolean = true;
export const Loader: Module<LoaderState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
